import initializeData from "../lib/initData";

const INIT_DATA = "INIT_DATA";

const initData = (polls, votes, employees, employee) => {
  return {
    polls,
    votes,
    employee,
    employees,
    type: INIT_DATA,
  };
};

const handleInitData = () => {
  return (dispatch) => {
    return initializeData().then(({ polls, votes, employees, employee }) => {
      dispatch(initData(polls, votes, employees, employee));
    });
  };
};

export { INIT_DATA, initData, handleInitData };
