import { INIT_DATA, handleInitData } from "../actions/shared";
import votesMap from "../reducers/votesMap";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { votes } from "../lib/_DATA";

const store = createStore(reducer, composeWithDevTools(middleware));

describe("Save a question", () => {
  var unsubscribe = store.subscribe(() => {
    expect(store.getState().votesMap.toEqual({ ...votes }));
  });

  it("should return the votes correctly", () => {
    expect(
      votesMap(
        {},
        {
          type: INIT_DATA,
          votes,
        }
      )
    ).toEqual({ ...votes });
  });

  it("should dispatch votes properly", async () => {
    store.dispatch(handleInitData(votes));
  });

  unsubscribe();
});
