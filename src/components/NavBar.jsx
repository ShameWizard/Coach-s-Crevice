import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignOut from "./SignOut.jsx";
import { Route } from "react-router";

class UnconnectedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userEmail: "",
      displayname: ""
    };
  }
  render = () => {
    let userEmailDisplay = "";
    let homePageLink = "/";

    if (this.props.loggedIn === true) {
      userEmailDisplay = this.props.displayName;
      homePageLink = "/userhome";
      return (
        <div className="navwrapdiv">
          <Link to={homePageLink} className="logolink">
            <div className="logoimg" />
            <h4 className="logotext">OACH'S CREVICE</h4>
          </Link>
          <div className="accountdiv">
            <h4 className="logotext capitalized">{userEmailDisplay}</h4>
            <div className="accountlogo" />
            <SignOut>
              <Route to="/" />
            </SignOut>
          </div>
        </div>
      );
    }

    return (
      <div className="navwrapdiv">
        <Link to={homePageLink} className="logolink">
          <div className="logoimg" />
          <h4 className="logotext">COACH LINEUP</h4>
        </Link>
        <div className="accountdiv">
          <div className="accountlogo" />
          <SignOut>
            <Route to="/" />
          </SignOut>
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    loggedIn: st.loggedIn,
    userEmail: st.userEmail,
    displayName: st.displayName
  };
};
let NavBar = connect(mapStateToProps)(UnconnectedNavBar);
export default NavBar;
