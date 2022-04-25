import { SIGN_IN } from "actions/employee";
import { INIT_DATA } from "actions/shared";

const employee = (state = null, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { name: action.employee };
    case INIT_DATA:
      return { ...state };
    default:
      return { ...state };
  }
};

export default employee;
