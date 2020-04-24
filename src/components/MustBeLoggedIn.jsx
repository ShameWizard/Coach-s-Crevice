import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedMustBeLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      userEmail: this.props.userEmail,
      userId: this.props.userId
    };
  }
  render = () => {
    return (
      <div>
        <h4>
          Hey! You need to signed into your account in order to access these
          features.{" "}
        </h4>
        <Link to="/signin">Log me in to my account</Link>
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
    createdTeams: st.createdTeams
  };
};
let MustBeLoggedIn = connect(mapStateToProps)(UnconnectedMustBeLoggedIn);
export default MustBeLoggedIn;
