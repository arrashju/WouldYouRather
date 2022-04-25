const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
const SIGN_IN = "SIGN_IN";

const updateEmployee = (name, employee) => {
  return {
    name,
    employee,
    type: UPDATE_EMPLOYEE,
  };
};

const signIn = (employee) => {
  return {
    employee,
    type: SIGN_IN,
  };
};

const handleUpdateEmployee = (name, employee) => (dispatch) => {
  return dispatch(updateEmployee(name, employee));
};

const handleSignIn = (employee) => (dispatch) => {
  return dispatch(signIn(employee));
};

export { SIGN_IN, UPDATE_EMPLOYEE, handleSignIn, handleUpdateEmployee };
