const UPDATE_POLL = "UPDATE_POLL";
const ADD_POLL = "ADD_POLL";

const updatePoll = (pollId, poll) => {
  return {
    pollId,
    poll,
    type: UPDATE_POLL,
  };
};

const addPoll = (poll) => {
  return {
    poll,
    type: ADD_POLL,
  };
};

const handleUpdatePoll = (pollId, poll) => (dispatch) => {
  return dispatch(updatePoll(pollId, poll));
};

const handleAddPoll = (poll) => (dispatch) => {
  return saveQuestion(poll).then((res) => {
    dispatch(addPoll(res.data));
  });
};

const saveQuestion = (question) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ data: question });
    }, 1000);
  });
};

export { UPDATE_POLL, ADD_POLL, handleUpdatePoll, handleAddPoll };
