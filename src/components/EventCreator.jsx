import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import MiniCalendar from "./MiniCalendar.jsx";

class UnconnectedEventCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: "",
      loggedIn: false,
      userEmail: "",
      userId: "",
      createdEvents: "",
      createdTeams: "",
      createdPlayers: "",
      selOpponent: "",
      selectedDate: "",
      selTime: "17:00",
      selLocation: "",
      savedLocations: [],
      success: false
    };
  }

  timeChangeHandler = evt => {
    this.setState({
      selTime: evt.target.value
    });
  };
  typeChangeHandler = evt => {
    this.setState({
      selType: evt.target.value
    });
  };
  locationChangeHandler = evt => {
    this.setState({
      selLocation: evt.target.value
    });
  };
  opponentChangeHandler = evt => {
    this.setState({
      selOpponent: evt.target.value
    });
  };
  eventSubmitter = async evt => {
    evt.preventDefault();
    const data = new FormData();
    data.append("teamId", this.props.teamId);
    data.append("userEmail", this.props.userEmail);
    data.append("date", this.props.selectedDate);
    data.append("time", this.state.selTime);
    data.append("type", this.state.selType);
    data.append("location", this.state.selLocation);
    data.append("opponent", this.state.selOpponent);
    const response = await fetch("/eventcreated", {
      method: "POST",
      body: data
    });
    const body = await response.text();
    console.log(body, "body");
    const parsed = JSON.parse(body);
    if (!parsed.success) return alert(parsed.message);
    this.setState({ success: true });
    return (
      this.props.dispatch({
        type: "eventcreated",
        createdEvents: parsed.createdEvents
      }),
      this.props.dispatch({
        type: "sign-success",
        createdEvents: parsed.createdTeams,
        userEmail: parsed.userEmail
      })
    );
  };
  optionalOpponent = () => {
    if (this.state.selType === "game") {
      return (
        <div>
          <h4 className="italic">Opposing Team Name</h4>
          <input
            type="text"
            className="textbox"
            onChange={this.opponentChangeHandler}
          />
        </div>
      );
    }
  };

  render = () => {
    if (this.state.success === true) {
      return <Redirect to="/userhome" />;
    }
    return (
      <div className="eventwrap">
        <form onSubmit={this.eventSubmitter}>
          <div className="bluewrapper">
            <div>
              <h4 className="italic">Date</h4>
              <MiniCalendar />
            </div>
            <div>
              <h4 className="italic">Time</h4>
              <input
                className="textbox"
                type="time"
                defaultValue="17:00"
                onChange={this.timeChangeHandler}
              />
              <h4 className="italic">Event Type</h4>
              <select className="textbox" onChange={this.typeChangeHandler}>
                <option value="">-none-</option>
                <option value="game">GAME</option>
                <option value="practice">PRACTICE</option>
                <option value="special">SPECIAL</option>
              </select>
              {this.optionalOpponent()}
              <h4 className="italic">Location</h4>
              <input
                type="text"
                className="textbox"
                onChange={this.locationChangeHandler}
              />
              <div className="btnwrapper">
                <input
                  className="btn next"
                  id="invert"
                  type="submit"
                  value="Add"
                />
              </div>
            </div>
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
    currentPage: st.currentPage,
    selectedDate: st.selectedDate,
    teamId: st.teamId
  };
};

let EventCreator = connect(mapStateToProps)(UnconnectedEventCreator);

export default EventCreator;
