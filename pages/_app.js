import "styles/globals.css";
import { useEffect } from "react";
import { createStore } from "redux";
import reducer from "reducers";
import middleware from "middleware";
import { handleInitData } from "../actions/shared";
import { composeWithDevTools } from "redux-devtools-extension";
import SignIn from "./signIn";
import { Provider as ReduxProvider } from "react-redux";
import Head from "next/head";

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
      <>
        <Head>
          <title>Would You Rather</title>
          <meta property="og:title" content="Would You Rather" key="title" />
        </Head>
        <ReduxProvider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </ReduxProvider>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Would You Rather</title>
          <meta property="og:title" content="Would You Rather" key="title" />
        </Head>
        <ReduxProvider store={store}>
          <SignIn {...pageProps} />
        </ReduxProvider>
      </>
    );
  }
};

export default App;
