import { combineReducers } from "redux";
import employee from "./employee";
import employeeMap from "./employeeMap";
import pollMap from "./pollMap";
import votesMap from "./votesMap";

const reducers = {
  pollMap,
  votesMap,
  employeeMap,
  employee,
};

export default combineReducers(reducers);
