import SignIn from "../pages/signIn";
import "@testing-library/jest-dom";
import { Provider as ReduxProvider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import singletonRouter from "next/router";
import { render, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import "jest-styled-components";

jest.mock("next/dist/client/router", () => require("next-router-mock"));
jest.useFakeTimers();

const store = createStore(reducer, composeWithDevTools(middleware));

describe("Sign-in screen", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/signIn");
  });

  it("should not allow sign-in if employee not selected", () => {
    let component = render(
      <ReduxProvider store={store}>
        <SignIn />
      </ReduxProvider>
    );
    let submitButton = component.getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(submitButton).toBeInTheDocument();
    expect(component.queryByTestId("error-header")).toBeInTheDocument();
    expect(component.queryByTestId("success-header")).not.toBeInTheDocument();
  });

  it("should allow sign-in if employee is selected", () => {
    let component = render(
      <ReduxProvider store={store}>
        <SignIn />
      </ReduxProvider>
    );

    setTimeout(() => {
      let employee = component.getByTestId("Aliyah");
      fireEvent.click(employee);
      let submitButton = component.getByTestId("submit-button");
      fireEvent.click(submitButton);
      expect(component.queryByTestId("success-header")).toBeInTheDocument();
      expect(component.queryByTestId("error-header")).not.toBeInTheDocument();
      expect(singletonRouter).toMatchObject({
        asPath: "/trending",
        pathname: "/trending",
        query: {},
      });
    }, 250);
  });
});
