import { render } from "react-dom";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import store from "./stores/";
import "bulma/css/bulma.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#content")
);
