import { UPDATE_EMPLOYEE } from "actions/employee";
import { INIT_DATA } from "actions/shared";

const employeeMap = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYEE:
      return { ...state, [action.name]: { ...action.employee } };
    case INIT_DATA:
      return { ...state, ...action.employees };
    default:
      return { ...state };
  }
};

export default employeeMap;
