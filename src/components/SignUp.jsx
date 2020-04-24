import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      password: "",
      loggedIn: false,
      userId: "",
      createdEvents: "",
      displayName: ""
    };
  }
  generateUserId = () => {
    return Math.floor(Math.random() * 100000000);
  };
  handleUserEmailChange = evt => {
    this.setState({ userEmail: evt.target.value });
  };
  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };
  handleDisplayNameChange = evt => {
    this.setState({ displayName: evt.target.value });
  };
  signUpHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    let userId = this.generateUserId();
    console.log(userId);
    data.append("userEmail", this.state.userEmail);
    data.append("password", this.state.password);
    data.append("userId", userId);
    data.append("displayName", this.state.displayName);
    const response = await fetch("/signup", { method: "POST", body: data });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (!parsed.success) return alert(parsed.message);
    this.props.dispatch({
      type: "signup-success",
      userEmail: this.state.userEmail,
      userId: userId,
      displayName: this.state.displayName
    });
  };
  render = () => {
    if (this.props.loggedIn === true) {
      return <Redirect to="/userhome" />;
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
                  <Link className="btn lgn tabbtn" to="/signin" id="invert">
                    Sign In
                  </Link>
                  <button className="selbtn tabbtn">Sign Up</button>
                </div>
                <form onSubmit={this.signUpHandler}>
                  <h4 className="italic">Email</h4>
                  <input
                    className="textbox"
                    type="text"
                    onChange={this.handleUserEmailChange}
                  />
                  <h4 className="italic">Display Name</h4>
                  <input
                    className="textbox"
                    type="text"
                    onChange={this.handleDisplayNameChange}
                  />
                  <h4 className="italic">Password</h4>
                  <input
                    className="textbox"
                    type="password"
                    onChange={this.handlePasswordChange}
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
    password: st.password,
    userId: st.userId,
    createdEvents: st.createdEvents
  };
};
let SignUp = connect(mapStateToProps)(UnconnectedSignUp);

export default SignUp;
