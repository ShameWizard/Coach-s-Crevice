import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedSignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      loggedIn: false
    };
  }
  signOutHandler = async () => {
    const response = await fetch("/signout", { method: "POST" });
    const body = await response.text();
    const parsed = JSON.parse(body);
    if (parsed.success)
      this.props.dispatch({
        type: "signout"
      });
  };
  render = () => {
    if (this.props.loggedIn === true) {
      return (
        <div>
          <Link to="/" className="btn" onClick={this.signOutHandler}>
            Sign Out
          </Link>
        </div>
      );
    }
    if (this.props.loggedIn === false) {
      return <Redirect to="/signin"></Redirect>;
    }
  };
}
let mapStateToProps = st => {
  return {
    userEmail: st.userEmail,
    loggedIn: st.loggedIn
  };
};
let SignOut = connect(mapStateToProps)(UnconnectedSignOut);
export default SignOut;
