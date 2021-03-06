import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedUserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userEmail: "",
      userId: "",
      createdPlayers: [],
      createdEvents: [],
      createdTeams: [],
      currentPage: ""
    };
  }
  componentDidMount = () => {
    this.setState({
      createdTeams: this.props.createdTeams
    });
  };
  condBtnRender = () => {
    if (
      this.props.currentPage === "TEAM CREATOR" ||
      this.props.currentPage === "TEAM MANAGER"
    )
      return (
        <div className="yellowwrapper">
          <Link to="/userhome" className="btn">
            Back to Home
          </Link>
        </div>
      );
    return (
      <div className="yellowwrapper">
        <Link className="btn" to="/teamcreator">
          New Team
        </Link>
      </div>
    );
  };
  teamListRender = () => {
    if (this.state.createdTeams === []) {
      console.log("hello!");
      return <li className="uppercase">-No Teams Created Yet-</li>;
    }

    return (
      <ul>
        {this.state.createdTeams.map(team => {
          return (
            <li className="uppercase">
              <Link
                className="teamlist"
                key={team}
                to={{
                  pathname: `/teammanager/${team.teamId}`,
                  state: { currentTeam: team }
                }}
              >
                {team.teamName.slice(0, 10)}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  render = () => {
    let teamList = this.teamListRender();
    return (
      <div className="homesidebar">
        <div>
          <h2>{this.props.currentPage}</h2>
        </div>
        <div>
          <ul className="dropdown">
            <div className="menuicon">chevron_left</div>MY TEAMS
            <li className="hoverdrop">{teamList}</li>
          </ul>
        </div>
        {this.condBtnRender()}
      </div>
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
    currentPage: st.currentPage
  };
};
let UserHome = connect(mapStateToProps)(UnconnectedUserHome);
export default UserHome;
