import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "@/state/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
