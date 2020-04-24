import React, { Component } from "react";
import { connect } from "react-redux";
import { RadioGroup, Radio } from "react-radio-group";
import MustBeLoggedIn from "./MustBeLoggedIn.jsx";

class UnconnectedTeamCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userEmail: "",
      userId: "",
      createdEvents: [],
      createdTeams: [],
      createdPlayers: [],

      teamCity: "",
      teamSport: "",
      teamName: "",
      teamAbb: "",
      teamId: "",
      teamLogo: "",
      redirect: false
    };
  }
  componentDidMount = () => {
    this.props.dispatch({
      type: "updatecurrpage",
      currentPage: "TEAM CREATOR"
    });
  };
  teamIdGenerator = () => {
    return Math.floor(Math.random() * 100000000);
  };
  teamSubmitHandler = async evt => {
    let teamId = this.teamIdGenerator();
    evt.preventDefault();
    let data = new FormData();
    data.append("teamSport", this.state.teamSport);
    data.append("teamCity", this.state.teamCity);
    data.append("teamName", this.state.teamName);
    data.append("teamAbb", this.state.teamAbb);
    data.append("teamId", teamId);
    data.append("teamLogo", this.state.teamLogo);
    data.append("userEmail", this.props.userEmail);
    const response = await fetch("/teamcreator", {
      method: "POST",
      body: data
    });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (!parsed.success) return alert(parsed.message);
    this.props.dispatch({
      type: "teamcreated",
      createdTeams: parsed.createdTeams,
      redirect: true
    });
  };
  sportSelectHandler = evt => {
    this.setState({
      teamSport: evt.target.value
    });
  };
  teamCityHandler = evt => {
    this.setState({
      teamCity: evt.target.value
    });
  };
  teamNameHandler = evt => {
    this.setState({
      teamName: evt.target.value
    });
  };
  teamAbbHandler = evt => {
    this.setState({
      teamAbb: evt.target.value
    });
  };
  teamLogoHandler = evt => {
    let img = evt.target.files;
    this.setState({
      teamLogo: img
    });
    console.log(img);
  };
  render = () => {
    if (this.props.userEmail === "" || this.props.loggedIn === false) {
      return (
        <div>
          <MustBeLoggedIn />
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.teamSubmitHandler}>
          <div className="greenwrapper">
            <h4 className="italic inv">Sport*</h4>
            <select className="textbox inv" onChange={this.sportSelectHandler}>
              <option value="">-Please Select an Option-</option>
              <option value="soccer">Soccer</option>
              <option value="hockey">Hockey</option>
              <option value="Basketball">Basketball</option>
              <option value="Football">Football</option>
              <option value="Baseball">Baseball</option>
            </select>
            {/* <RadioGroup
              name="sports"
              selectedValue={this.state.teamSport}
              onChange={this.sportSelectHandler}
              className="textbox inv"
            >
              <Radio name="hockey" value="hockey" />
              Hockey
              <Radio name="soccer" value="soccer" />
              Soccer
              <Radio name="football" value="football" />
              Football
              <Radio name="basketball" value="basketball" />
              Basketball
              <Radio name="baseball" value="baseball" />
              Baseball
            </RadioGroup> */}
            <h4 className="italic inv">City*</h4>
            <input
              type="text"
              className="capitalized textbox"
              onChange={this.teamCityHandler}
            />
            <h4 className="italic inv">Team name*</h4>
            <input
              type="text"
              className="capitalized textbox"
              onChange={this.teamNameHandler}
            />
            <h4 className="italic inv">Team name's abbrevation* (3 letters)</h4>
            <input
              type="text"
              className="uppercase textbox"
              onChange={this.teamAbbHandler}
              maxLength="3"
            />
            <h4 className="italic inv">
              Would you like to include a picture of your team's logo?
            </h4>
            <input
              type="file"
              accept="image/*"
              single
              onChange={this.teamLogoHandler}
              className="textbox"
            />
            <input className="btn" type="submit" />
          </div>
        </form>
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
    createdPlayers: st.createdPlayers,
    redirect: st.redirect
  };
};
let TeamCreator = connect(mapStateToProps)(UnconnectedTeamCreator);
export default TeamCreator;
