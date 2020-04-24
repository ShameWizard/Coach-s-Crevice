import { createStore } from "redux";

const initialState = {
  userEmail: "",
  loggedIn: false,
  userId: "",
  createdEvents: [],
  createdTeams: [],
  createdTeams: [],
  selectedDate: "",
  currentTeam: "",
  currentPage: ""
};

let reducer = (state, action) => {
  if (action.type === "signup-success") {
    return {
      ...state,
      userEmail: action.userEmail,
      userId: action.userId,
      loggedIn: true,
      createdEvents: action.createdEvents,
      createdTeams: action.createdTeams,
      createdPlayers: action.createdPlayers,
      displayName: action.displayName
    };
  }
  if (action.type === "signin-success") {
    return {
      ...state,
      userEmail: action.userEmail,
      userId: action.userId,
      loggedIn: true,
      createdEvents: action.createdEvents,
      createdTeams: action.createdTeams,
      createdPlayers: action.createdPlayers,
      displayName: action.displayName
    };
  }
  if (action.type === "dateselected") {
    return {
      ...state,
      selectedDate: action.selectedDate,
      dateWasPicked: action.dateWasPicked
    };
  }
  if (action.type === "signout") {
    return {
      ...state,
      userEmail: "",
      loggedIn: false,
      userId: "",
      createdEvents: "",
      createdTeams: ""
    };
  }
  if (action.type === "teamcreated") {
    return {
      ...state,
      createdTeams: action.createdTeams
    };
  }
  if (action.type === "eventcreated") {
    return {
      ...state,
      createdEvents: action.createdEvents
    };
  }
  if (action.type === "updatecurrpage") {
    return {
      ...state,
      currentPage: action.currentPage,
      currentTeam: action.currentTeam
    };
  }
  return state;
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
