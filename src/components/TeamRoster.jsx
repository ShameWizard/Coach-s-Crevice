import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedTeamRoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userEmail: "",
      userId: "",
      createdEvents: "",
      createdTeams: "",
      createdPlayers: ""
    };
  }
  render = () => {
    return (
      <div>
        <h2>Team Roster</h2>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    loggedIn: st.loggedIn,
    userEmail: st.userEmail,
    userId: st.userId,
    createdEvents: st.createdPlayers,
    createdTeams: st.createdTeams,
    createdEvents: st.createdEvents
  };
};
let TeamRoster = connect(mapStateToProps)(UnconnectedTeamRoster);

export default TeamRoster;
