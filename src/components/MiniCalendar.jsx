import React, { Component } from "react";
import {
  dateFns,
  format,
  startOfWeek,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  endOfYesterday,
  isSameMonth,
  isSameDay,
  isBefore,
  prevMonth,
  nextMonth,
  parse
} from "date-fns";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedMiniCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: this.props.selectedDate,
      toggleEventScheduler: false,
      dateWasPicked: false,
      createdEvents: "",
      createdTeams: "",
      createdPlayers: ""
    };
  }
  componentDidMount = () => {
    this.props.dispatch({
      type: "updatecurrpage",
      currentPage: "CALENDAR"
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };
  renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="miniheader row flex-middle">
        <div className="col col-start"></div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
      </div>
    );
  };

  renderDays = () => {
    const dateFormat = "dddd";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      let day = "";
      if (i === 0) {
        day = "SUN";
      }
      if (i === 1) {
        day = "MON";
      }
      if (i === 2) {
        day = "TUE";
      }
      if (i === 3) {
        day = "WED";
      }
      if (i === 4) {
        day = "THU";
      }
      if (i === 5) {
        day = "FRI";
      }
      if (i === 6) {
        day = "SAT";
      }
      days.push(
        <div className="col col-center" key={i}>
          {day}
        </div>
      );
    }
    // for (let i = 0; i < 7; i++) {
    //   days.push(
    //     <div className="col col-center" key={i}>
    //       {format(addDays(startDate, i), dateFormat)}
    //     </div>
    //   );
    // }
    return <div className="days row">{days}</div>;
  };
  eventScheduler = () => {
    this.setState({ toggleEventScheduler: !this.state.toggleEventScheduler });
  };
  hoverdatechanger = date => {
    this.setState({ hoverDate: date });
  };
  hovDivSelector = cloneday => {
    if (
      this.state.dateWasPicked === true &&
      cloneday === this.state.selectedDate
    ) {
      console.log(this.state.selectedDate);
      return "picked";
    }

    return;
  };
  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const pickedDate = "";

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : isBefore(day, new Date(endOfYesterday()))
                ? "past"
                : "mininums"
            }`}
            key={day}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
      dateWasPicked: true,
      pickedDate: day
    });
    this.props.dispatch({
      type: "dateselected",
      selectedDate: this.state.selectedDate
    });
  };

  render() {
    return (
      <div className="minicalendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    createdEvents: st.createdEvents,
    createdTeams: st.createdTeams,
    createdPlayers: st.createdPlayers,
    currentPage: st.currentPage,
    selectedDate: st.selectedDate
  };
};
let MiniCalendar = connect(mapStateToProps)(UnconnectedMiniCalendar);

export default MiniCalendar;
