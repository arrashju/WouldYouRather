import { UPDATE_POLL, ADD_POLL } from "actions/poll";
import { INIT_DATA } from "actions/shared";

const pollMap = (state = {}, action) => {
  switch (action.type) {
    case ADD_POLL:
      return { ...state, [Object.keys(state).length]: { ...action.poll } };
    case UPDATE_POLL:
      return { ...state, [action.pollId]: { ...action.poll } };
    case INIT_DATA:
      return { ...state, ...action.polls };
    default:
      return { ...state };
  }
};

export default pollMap;
