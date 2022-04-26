import { ADD_POLL, handleAddPoll, handleUpdatePoll } from "../actions/poll";
import { ADD_VOTE, handleAddVote } from "../actions/votes";
import { INIT_DATA, handleInitData } from "../actions/shared";
import pollMap from "../reducers/pollMap";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { questions } from "../lib/_DATA";

const store = createStore(reducer, composeWithDevTools(middleware));

describe("Save a question", () => {
  var unsubscribe = store.subscribe(() => {
    expect(store.getState().pollMap.toEqual({ ...questions }));
  });

  it("should return the question correctly formatted", () => {
    expect(
      pollMap(
        {},
        {
          type: INIT_DATA,
          polls: questions,
        }
      )
    ).toEqual({ ...questions });
  });

  it("dispatches poll correctly after formatting poll", async () => {
    store.dispatch(handleInitData(questions));
  });

  unsubscribe();

  let poll = {
    category: "Business",
    count: 0,
    creator: "Aliyah",
    image: null,
    leader: null,
    options: {
      0: { text: "Michael Jordan", count: 0 },
      1: { text: "Lebron James", count: 0 },
    },
    question: "Who is the GOAT of basketball?",
  };

  var unsubscribe = store.subscribe(() => {
    expect(store.getState().pollMap.toEqual({ ...questions, 3: poll }));
  });

  it("should return the question correctly formatted", () => {
    expect(
      pollMap(
        {},
        {
          type: ADD_POLL,
          poll,
        }
      )
    ).toEqual({ 0: poll });
  });

  it("dispatches poll correctly after formatting poll", async () => {
    store.dispatch(handleAddPoll(poll));
  });

  unsubscribe();

  const choice = 0;
  const vote = { pollId: 4, voter: "Aliyah", option: choice };

  var unsubscribe = store.subscribe(() => {
    expect(store.getState().votesMap.toEqual(vote));
  });

  it("dispatches vote correctly", async () => {
    store.dispatch(handleAddVote(vote.pollId, vote));
  });

  unsubscribe();

  poll.options[choice].count += 1;

  //null: tie
  //0: option 0 took the lead
  //1: option 1 took the lead
  const newPoll = {
    ...poll,
    leader:
      poll.options[0].count == poll.options[1].count
        ? null
        : poll.options[0].count > poll.options[1].count
        ? 0
        : 1,
    count: poll.options[0].count + poll.options[1].count,
  };

  var unsubscribe = store.subscribe(() => {
    expect(store.getState().pollsMap.toEqual(newPoll));
  });

  it("dispatches vote correctly", async () => {
    store.dispatch(handleUpdatePoll(0, newPoll));
  });

  unsubscribe();
});
