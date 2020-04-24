import React, { Component } from "react";
import { connect } from "react-redux";
import UserHome from "./UserHome.jsx";
import Calendar from "./Calendar.jsx";
import { Link, Redirect } from "react-router-dom";

class UnconnectedSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userEmail: "",
      password: "",
      userId: "",
      createdEvents: "",
      createdTeams: ""
    };
  }
  userEmailChangeHandler = evt => {
    this.setState({
      userEmail: evt.target.value
    });
  };
  userPasswordChangeHandler = evt => {
    this.setState({
      password: evt.target.value
    });
  };
  signInHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("userEmail", this.state.userEmail);
    data.append("password", this.state.password);
    const response = await fetch("/signin", { method: "POST", body: data });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (!parsed.success) return alert(parsed.message);
    return this.props.dispatch({
      type: "signin-success",
      userEmail: this.state.userEmail,
      userId: parsed.userId,
      createdEvents: parsed.createdEvents,
      createdTeams: parsed.createdTeams,
      displayName: parsed.displayName
    });
  };
  render = () => {
    if (this.props.loggedIn === true) {
      return <Redirect to="userhome" />;
    }
    return (
      <div>
        <div className="loginheader">
          <h1 className="bigitalic">Welcome to Coach's Crevice!</h1>
        </div>
        <div className="wrapper">
          <div className="loginbox">
            <div className="firstbox"></div>
            <div className="secondboxwrap">
              <div className="secondbox">
                <div className="btnwrapper">
                  <button className="selbtn tabbtn">Sign In</button>
                  <Link className="btn lgn tabbtn" to="/signup" id="invert">
                    Sign Up
                  </Link>
                </div>
                <form onSubmit={this.signInHandler}>
                  <h4 className="italic">Email</h4>
                  <input
                    className="textbox"
                    type="text"
                    onChange={this.userEmailChangeHandler}
                  />
                  <h4 className="italic">Password</h4>

                  <input
                    className="textbox"
                    type="password"
                    onChange={this.userPasswordChangeHandler}
                  />
                  <div className="btnwrapper">
                    <input className="btn next" id="invert" type="submit" />
                  </div>
                </form>
              </div>
            </div>
            <div className="thirdbox"></div>
          </div>
          <div className="homeparagraph">
            Coach's Crevice is a scheduling and team management tool designed
            with ease-of-use in mind. Create your teams and players, edit
            lineups and schedule practices and matches in as few clicks as
            possible.
            <br></br>
            Don't already have an account? {""}
            <Link className="nounderline" to="/signup">
              Click here
            </Link>{" "}
            or on the "Sign Up" tab above the form!
          </div>
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    userEmail: st.userEmail,
    loggedIn: st.loggedIn,
    userId: st.userId,
    createdEvents: st.createdEvents,
    createdTeams: st.createdTeams
  };
};
let SignIn = connect(mapStateToProps)(UnconnectedSignIn);
export default SignIn;
