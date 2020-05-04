import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userEmail: "",
      userId: "",
      createdEvents: "",
      createdTeams: "",
      createdPlayers: "",
      currentTeam: ""
    };
  }
  componentDidMount = () => {
    this.props.dispatch({
      type: "updatecurrpage",
      currentPage: "Home"
    });
    this.props.dispatch({
      type: "updatecurrteam",
      currentTeam: this.props.teamId
    });
  };
}

render = () => {
  return <div></div>;
};

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

let MainPage = connect(mapStateToProps)(UnconnectedMainPage);
export default MainPage;
