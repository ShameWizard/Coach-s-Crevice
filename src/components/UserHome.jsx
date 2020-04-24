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
      createdTeams: "",
      currentPage: ""
    };
  }
  componentDidMount = () => {
    this.setState({
      createdTeams: this.props.createdTeams
    });
  };
  teamListRender = () => {
    if (this.state.createdTeams === "") {
      console.log("hello!");
      return <div>-No teams-</div>;
    }

    return (
      <ul>
        {this.state.createdTeams.map(team => {
          return (
            <li className="teamlist uppercase" key={team}>
              <Link
                key={team}
                to={{
                  pathname: `/teammanager/${team.teamId}`,
                  state: { currentTeam: team }
                }}
              >
                {team.teamName}
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
            <div className="menuicon">chevron_left</div>MANAGE
            <li className="hoverdrop">
              <div>{teamList}</div>
            </li>
          </ul>
        </div>
        <div>
          <div className="dropdown">
            <div className="menuicon">chevron_left</div>CREATE NEW
            <ul className="hoverdrop">
              <Link to="/eventcreator">
                <li className="eventicon">Event</li>
              </Link>
              <Link to="/teamcreator">
                <li className="teamicon">Team</li>
              </Link>
              <Link to="/playercreator" className="playericon">
                <li className="playericon">Player</li>
              </Link>
            </ul>
          </div>
        </div>
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
