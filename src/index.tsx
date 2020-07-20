import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import App from "./App";
import "./css/tailwind.css";
import * as serviceWorker from "./serviceWorker";
import { rootReducer } from "./store";

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
