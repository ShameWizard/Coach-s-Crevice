import React, { Component } from "react";

class CalFooter extends Component {
  render = () => {
    return (
      <div className="yellowwrapper">
        <div className="inv italic">
          *Click a date in order to view that day's events! Events cannot be
          scheduled on days that are past*
        </div>
        <div className="inv">
          <h2 className="hovdivtitle inv">LEGEND: </h2>
          <div className="selexample"></div> : denotes either today's date upon
          initial load or a selected date once clicked
        </div>
        <div className="inv">
          <div className="numexample"></div> : denotes the number of events
          scheduled for that date
        </div>
      </div>
    );
  };
}

export default CalFooter;
