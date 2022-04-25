const UPDATE_VOTE = "UPDATE_VOTE";
const ADD_VOTE = "ADD_VOTE";

const updateVote = (voteId, vote) => {
  return {
    voteId,
    vote,
    type: UPDATE_VOTE,
  };
};

const addVote = (voteId, vote) => {
  return {
    voteId,
    vote,
    type: ADD_VOTE,
  };
};

const handleUpdateVote = (voteId, vote) => (dispatch) => {
  return dispatch(updateVote(voteId, vote));
};

const handleAddVote = (voteId, vote) => (dispatch) => {
  return dispatch(addVote(voteId, vote));
};

export { UPDATE_VOTE, ADD_VOTE, handleUpdateVote, handleAddVote };
