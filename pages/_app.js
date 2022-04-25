import "styles/globals.css";
import { useState, useEffect } from "react";
import { createStore } from "redux";
import reducer from "reducers";
import middleware from "middleware";
import { handleInitData } from "../actions/shared";
import { composeWithDevTools } from "redux-devtools-extension";
import SignIn from "./signIn";
import { Provider as ReduxProvider } from "react-redux";

const store = createStore(reducer, composeWithDevTools(middleware));

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    initStore();
  }, []);

  const initStore = async () => {
    await store.dispatch(handleInitData());
  };

  if (store.getState().employee["name"]) {
    return (
      <ReduxProvider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </ReduxProvider>
    );
  } else {
    return (
      <ReduxProvider store={store}>
        <SignIn {...pageProps} />
      </ReduxProvider>
    );
  }
};

export default App;
