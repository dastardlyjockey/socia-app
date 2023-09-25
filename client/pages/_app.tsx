import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "@/state/store";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <CssBaseline />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
