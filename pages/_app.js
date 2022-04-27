import "styles/globals.css";
import { useEffect, useState } from "react";
import { createStore } from "redux";
import reducer from "reducers";
import middleware from "middleware";
import { handleInitData } from "../actions/shared";
import { composeWithDevTools } from "redux-devtools-extension";
import SignIn from "./signIn";
import { Provider as ReduxProvider } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import Error from "next/error";

const store = createStore(reducer, composeWithDevTools(middleware));

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);
  const [error, setError] = useState(false);

  useEffect(() => {
    initStore();
  }, []);

  const initStore = async () => {
    await store.dispatch(handleInitData());
  };

  useEffect(() => {
    router.events.on("routeChangeError", () => {
      setError(true);
      throw "invalid route";
    });

    router.events.on("routeChangeComplete", () => {
      setError(false);
    });
  }, []);

  if (store.getState().employee["name"]) {
    if (error) {
      return (
        <>
          <Head>
            <title>Would You Rather</title>
            <meta property="og:title" content="Would You Rather" key="title" />
          </Head>
          <ReduxProvider store={store}>
            {getLayout(<Error statusCode={404} />)}
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
            {getLayout(<Component {...pageProps} />)}
          </ReduxProvider>
        </>
      );
    }
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
