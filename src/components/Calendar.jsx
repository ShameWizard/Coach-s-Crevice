import React, { Component } from "react";
import {
  dateFns,
  format,
  startOfWeek,
  endOfYesterday,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isBefore,
  prevMonth,
  nextMonth,
  parse,
  parseISO,
  startOfToday
} from "date-fns";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EventCreator from "./EventCreator.jsx";
import CalFooter from "./CalFooter.jsx";
import { is } from "date-fns/locale";

class UnconnectedCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      currentMonth: new Date(),
      selectedDate: new Date(),
      dateWasPicked: false,
      createdEvents: undefined,
      createdTeams: [],
      createdPlayers: [],
      creatorMode: false,
      currentTeam: "",
      dateWasClosed: false
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "updatecurrpage",
      currentPage: "CALENDAR"
    });
    this.props.dispatch({
      type: "updatecurrteam",
      currentTeam: this.props.teamId
    });
    this.setState({
      createdEvents: this.props.createdEvents,
      userEmail: this.props.userEmail
    });
    this.teamFetcher();
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
  teamFetcher = () => {
    if (this.props.teamId === undefined) return { teamName: "" };
    return this.state.createdTeams.find(team => {
      team.teamId === this.props.currentTeam;
    });
  };
  renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
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
        day = "SUNDAY";
      }
      if (i === 1) {
        day = "MONDAY";
      }
      if (i === 2) {
        day = "TUESDAY";
      }
      if (i === 3) {
        day = "WEDNESDAY";
      }
      if (i === 4) {
        day = "THURSDAY";
      }
      if (i === 5) {
        day = "FRIDAY";
      }
      if (i === 6) {
        day = "SATURDAY";
      }
      days.push(
        <div className="col col-center" key={i}>
          {day}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };
  hoverdatechanger = date => {
    this.setState({ hoverDate: date });
  };

  creatorModeRenderer = () => {
    if (this.state.creatorMode === false) {
      return (
        <div className="btndiv">
          <div></div>
          <div>
            <button onClick={this.creatorModeToggle} className="bottom btn">
              {this.buttonTextRenderer()}
            </button>
            <button onClick={this.closePicked} className="bottom btn">
              Close Window
            </button>
          </div>
        </div>
      );
    }
    if (this.state.creatorMode === true) {
      return (
        <div>
          <div className="btndiv">
            <div className="hovdivtitle">EVENT CREATOR</div>

            <div>
              <button onClick={this.creatorModeToggle} className="bottom btn">
                {this.buttonTextRenderer()}
              </button>
              <button onClick={this.closePicked} className="bottom btn">
                Close Window
              </button>
            </div>
          </div>
          <EventCreator />
        </div>
      );
    }
  };

  buttonTextRenderer = () => {
    if (this.state.creatorMode === false) {
      return "Add Event";
    }
    if (this.state.creatorMode === true) {
      return "Cancel";
    }
  };

  eventsFinder = day => {
    // console.log(this.state.createdEvents, "props");
    // console.log(new Date(day).getTime(), "day");
    if (
      this.state.createdEvents === undefined ||
      this.state.createdEvents === null
    )
      return;
    let results =
      this.state.createdEvents &&
      this.state.createdEvents.find(event => {
        return (
          new Date(day).getTime() >= new Date(endOfYesterday()).getTime() &&
          new Date(event.date).getTime() === day.getTime()
        );
      });
    return results;
  };

  eventNumberRenderer = day => {
    if (this.state.createdEvents === undefined) return;

    let results = this.state.createdEvents.filter(event => {
      if (
        new Date(day).getTime() >= new Date(endOfYesterday()).getTime() &&
        new Date(event.date).getTime() === day.getTime()
      ) {
        return event;
      }
    });
    if (results.length === 0) return;
    // return results.length;
    return <div className="circle">{results.length}</div>;
  };
  eventRenderer = day => {
    if (this.state.createdEvents === undefined) return undefined;

    let results = this.state.createdEvents.filter(event => {
      if (
        new Date(day).getTime() >= new Date(endOfYesterday()).getTime() &&
        new Date(event.date).getTime() === day.getTime()
      ) {
        return event;
      }
    });

    if (results.length === 0) {
      return (
        <div>
          <div className="hovdivtitle">No events scheduled.</div>
          <ul className="eventsofday">
            <div className="italic">
              Click "Expand" and "Add" an event to change that!
            </div>
          </ul>
        </div>
      );
    }
    if (results.length > 0) {
      let sortedResults = results.sort((a, b) => {
        return (
          a.time[0] +
          a.time[1] +
          a.time[3] +
          a.time[4] -
          (b.time[0] + b.time[1] + b.time[3] + b.time[4])
        );
      });
      console.log(sortedResults);
      return (
        <div>
          <div className="hovdivtitle">This day's schedule</div>
          <ul className="eventsofday">
            {sortedResults.map(event => {
              if (event.type === "practice")
                return (
                  <li className="listedevent">
                    <div>
                      {event.time} {event.type} @ {event.location}
                    </div>
                  </li>
                );
              if (event.type === "game")
                return (
                  <li className="listedevent">
                    <div>
                      {event.time} {event.type} @ {event.location}{" "}
                      {event.teamName} vs. {event.opponent}
                    </div>
                  </li>
                );
            })}
          </ul>
        </div>
      );
    }
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

        days.push(
          <div
            className={`col cell ${
              isSameDay(day, selectedDate)
                ? "selected"
                : this.eventsFinder(cloneDay)
                ? "hasevent"
                : !isSameMonth(day, monthStart)
                ? "disabled"
                : isBefore(day, new Date(startOfToday()))
                ? "past"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <div>
              <div
                className={`${
                  this.state.dateWasPicked === true &&
                  isSameDay(day, selectedDate) &&
                  this.state.dateWasClosed === false
                    ? "picked"
                    : "hiddendiv"
                }`}
              >
                <div>
                  <div>{this.eventRenderer(cloneDay)}</div>
                </div>
                <div>
                  {this.creatorModeRenderer()}

                  <div className="bg" id="bg">
                    {formattedDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="eventnumwrap">{this.eventNumberRenderer(day)}</div>
            <span className="number">{formattedDate}</span>
            <div className="hiddenbtndiv">
              <button
                onClick={this.creatorModeToggle}
                className={`${
                  this.state.dateWasPicked === true &&
                  isSameDay(day, selectedDate)
                    ? "unhiddenbtn"
                    : "hiddenbtn"
                }`}
              >
                {this.buttonTextRenderer()}
              </button>
            </div>
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
    console.log("otherfunction was used");
    if (
      this.state.selectedDate === day &&
      this.state.pickedDate === day &&
      this.state.dateWasPicked === true
    )
      return;
    if (this.state.selectedDate !== day) {
      this.setState({
        selectedDate: day,
        dateWasPicked: true,
        pickedDate: day,
        dateWasClosed: false
      });
      this.props.dispatch({
        type: "dateselected",
        selectedDate: this.state.selectedDate
      });
    }
  };
  creatorModeToggle = () => {
    this.setState({ creatorMode: !this.state.creatorMode });
  };
  closePicked = evt => {
    evt.stopPropagation();
    console.log("function used");
    this.setState({
      dateWasPicked: false,
      selectedDate: new Date(),
      pickedDate: new Date(),
      dateWasClosed: !this.state.dateWasClosed,
      creatorMode: false
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    userEmail: st.userEmail,
    createdEvents: st.createdEvents,
    createdTeams: st.createdTeams,
    createdPlayers: st.createdPlayers,
    currentPage: st.currentPage,
    selectedDate: st.selectedDate,
    dateWasPicked: st.dateWasPicked,
    currentTeam: st.currentTeam
  };
};
let Calendar = connect(mapStateToProps)(UnconnectedCalendar);

export default Calendar;
