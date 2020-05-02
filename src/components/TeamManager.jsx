import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { endOfYesterday } from "date-fns";

class UnconnectedTeamManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdTeams: [],
      createdEvents: [],
      currentPage: "",
      teamId: this.props.props,
      currentTeam: {}
    };
  }
  componentDidMount = () => {
    this.setState({
      teamId: this.props.props,
      createdEvents: this.props.createdEvents,
      currentTeam: this.props.createdTeams.find(team => {
        return team.teamId === this.props.props;
      })
    });
    this.props.dispatch({
      type: "updatecurrpage",
      currentPage: "TEAM MANAGER",
      currentTeam: this.state.currentTeam
    });
  };
  carouselEvents = teamId => {
    // console.log(this.props.createdEvents);
    // if ((this.props.createdEvents.length = 0)) {
    //   return (
    //     <div>
    //       <ul className="carousellist">
    //         <li className="carouselevent">
    //           <div>-No upcoming events currently scheduled-</div>
    //         </li>
    //         <li className="carouselevent">
    //           <div>-No upcoming events currently scheduled-</div>
    //         </li>
    //         <li className="carouselevent">
    //           <div>-No upcoming events currently scheduled-</div>
    //         </li>
    //       </ul>
    //     </div>
    //   );
    // }
    let results = this.props.createdEvents.filter(event => {
      if (
        teamId === event.teamId &&
        new Date(event.date).getTime() >= new Date(endOfYesterday()).getTime()
      )
        return event;
    });
    let sortedResults = results.sort((a, b) => {
      return (
        a.time[0] +
        a.time[1] +
        a.time[3] +
        a.time[4] -
        (b.time[0] + b.time[1] + b.time[3] + b.time[4])
      );
    });
    let slicedResults = sortedResults.slice(0, 3);
    console.log(sortedResults);
    return (
      <div>
        <ul className="carousellist">
          {slicedResults.map(event => {
            if (event.type === "practice")
              return (
                <li className="carouselevent">
                  <div>
                    {event.date.slice(0, 15)}, {event.time} {event.type} @{" "}
                    {event.location}
                  </div>
                </li>
              );
            if (event.type === "game")
              return (
                <li className="carouselevent">
                  <div>
                    {event.date.slice(0, 15)}, {event.time} {event.type} @{" "}
                    {event.location} {event.teamName} vs. {event.opponent}
                  </div>
                </li>
              );
          })}
        </ul>
      </div>
    );
  };
  render = () => {
    return (
      <div className="gridwrapper">
        <div className="blockheader">
          <div>
            <Link to="/userhome" id="invert" className="btn">
              Back to Home
            </Link>
          </div>

          <h2 className="uppercase hovdivtitle">
            {this.state.currentTeam.teamName}
          </h2>
          <img src={this.state.currentTeam.teamLogo}></img>
        </div>
        <div className="carousel">{this.carouselEvents(this.props.teamId)}</div>

        <Link
          to={`/userhome/${this.state.teamId}`}
          className="mainblock1 cally"
        >
          CALENDAR
        </Link>
        <Link
          to={`/teamroster${this.state.teamId}`}
          className="mainblock2 rosterimg"
        >
          ROSTER
        </Link>

        {/* <div className="mainblock"></div>
        <div className="mainblock"></div>
        <div className="mainblock"></div>
        <div className="mainblock"></div>
        <div className="mainblock"></div> */}
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    teamId: st.teamId,
    currentTeam: st.currentTeam,
    createdTeams: st.createdTeams,
    createdEvents: st.createdEvents
  };
};
let TeamManager = connect(mapStateToProps)(UnconnectedTeamManager);
export default TeamManager;
