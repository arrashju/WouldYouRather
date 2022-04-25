import { render } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Trending from "../pages/trending";

const store = createStore(reducer, composeWithDevTools(middleware));

describe("Renders trending page", () => {
  it("trending render before loading elements should match snapshot", () => {
    const { container } = render(
      <ReduxProvider store={store}>
        <Trending />
      </ReduxProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
