import { INIT_DATA, handleInitData } from "../actions/shared";
import employeeMap from "../reducers/employeeMap";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { employees } from "../lib/_DATA";

const store = createStore(reducer, composeWithDevTools(middleware));

describe("Save a question", () => {
  var unsubscribe = store.subscribe(() => {
    expect(store.getState().employeeMap.toEqual({ ...employees }));
  });

  it("should return the employees correctly", () => {
    expect(
      employeeMap(
        {},
        {
          type: INIT_DATA,
          employees,
        }
      )
    ).toEqual({ ...employees });
  });

  it("should dispatch employees properly", async () => {
    store.dispatch(handleInitData(employees));
  });

  unsubscribe();
});
