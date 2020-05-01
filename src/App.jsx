import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import EventCreator from "./components/EventCreator.jsx";
import UserHome from "./components/UserHome.jsx";
import { connect } from "react-redux";
import PlayerCreator from "./components/PlayerCreator.jsx";
import Calendar from "./components/Calendar.jsx";
import TeamCreator from "./components/TeamCreator.jsx";
import TeamManager from "./components/TeamManager.jsx";
import CalFooter from "./components/CalFooter.jsx";
import TeamRoster from "./components/TeamRoster.jsx";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      loggedIn: false,
      userId: "",
      createdPlayers: [],
      createdEvents: [],
      createdTeams: [],
      selectedDate: "",
      displayName: ""
    };
  }
  fetchSession = async () => {
    const response = await fetch("/session");
    const body = await response.text();

    const parsed = JSON.parse(body);

    if (!parsed.success) return;
    this.props.dispatch({
      type: "signout"
    });
    let updatedEvents = parsed.createdEvents.map(event => {
      if (new Date(event.date).getTime() > new Date().getTime()) {
        return event;
      }
    });
    return this.props.dispatch({
      type: "signin-success",
      userEmail: parsed.userEmail,
      userId: parsed.userId,
      createdPlayers: parsed.createdPlayers,
      createdEvents: parsed.createdEvents,
      createdTeams: parsed.createdTeams,
      displayName: parsed.displayName
    });
  };
  componentDidMount = () => {
    this.fetchSession();
  };
  render = () => {
    return (
      <BrowserRouter>
        <NavBar className="navbar" />
        <Route exact={true} path="/" render={() => <SignIn />} />
        <Route exact={true} path="/signin" render={() => <SignIn />} />
        <Route exact={true} path="/signup" render={() => <SignUp />} />
        <Route
          exact={true}
          path="/eventcreator"
          render={() => (
            <div className="bigwrap">
              <div className="homediv">
                <UserHome />

                <div>
                  <div className="hovdivtitle">EVENT CREATOR</div>
                  <EventCreator props={this.state.selectedDate} />
                </div>
              </div>
            </div>
          )}
        />
        <Route
          exact={true}
          path="/userhome"
          render={() => (
            <div className="bigwrap">
              <div className="wider">
                <div className="flexer">
                  <UserHome />
                  <Calendar createdEvents={this.state.createdEvents} />
                </div>
                <CalFooter />
              </div>
            </div>
          )}
        />
        <Route
          exact={true}
          path="/userhome/:teamId"
          render={routeProps => (
            <div className="bigwrap">
              <div className="wider">
                <div className="flexer">
                  <UserHome />
                  <Calendar
                    props={
                      (this.props.createdTeams, routeProps.match.params.teamId)
                    }
                    teamId={routeProps.match.params.teamId}
                    createdEvents={this.state.createdEvents}
                  />
                </div>
                <CalFooter />
              </div>
            </div>
          )}
        />
        <Route
          exact={true}
          path="/teamroster/:teamId"
          render={routeProps => (
            <div className="bigwrap">
              <div className="homediv">
                <UserHome />
                <TeamRoster
                  props={
                    (this.props.createdTeams,
                    this.props.createdPlayers,
                    routeProps.match.params.teamId)
                  }
                  teamId={routeProps.match.params.teamId}
                />
              </div>
            </div>
          )}
        />
        <Route
          exact={true}
          path="/playercreator"
          render={() => (
            <div className="bigwrap">
              <div className="homediv">
                <UserHome />
                <PlayerCreator />
              </div>
            </div>
          )}
        />
        <Route
          exact={true}
          path="/teamcreator"
          render={() => (
            <div className="bigwrap">
              <div>
                <div className="homediv">
                  <UserHome />
                  <TeamCreator />
                </div>
              </div>
            </div>
          )}
        />
        <Route
          exact={true}
          path="/teammanager/:teamId"
          render={routeProps => (
            <div className="bigwrap">
              <div className="homediv">
                <UserHome />
                <TeamManager
                  props={
                    (this.props.createdTeams, routeProps.match.params.teamId)
                  }
                  teamId={routeProps.match.params.teamId}
                />
              </div>
            </div>
          )}
        />
      </BrowserRouter>
    );
  };
}
let mapStateToProps = st => {
  return {
    loggedIn: st.loggedIn,
    userEmail: st.userEmail,
    userId: st.userId,
    createdEvents: st.createdEvents,
    createdTeams: st.createdTeams,
    selectedDate: st.selectedDate,
    displayName: st.displayName
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
