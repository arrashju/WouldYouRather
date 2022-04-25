import { UPDATE_VOTE, ADD_VOTE } from "../actions/votes";
import { INIT_DATA } from "../actions/shared";

const votesMap = (state = {}, action) => {
  switch (action.type) {
    case ADD_VOTE:
      return { ...state, [action.voteId]: { ...action.vote } };
    case UPDATE_VOTE:
      return { ...state, [action.voteId]: { ...action.vote } };
    case INIT_DATA:
      return { ...state, ...action.votes };
    default:
      return { ...state };
  }
};

export default votesMap;
