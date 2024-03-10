import React from "react";
import { createRoot } from "react-dom/client";

import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/elegant-icons/style.css";
import "../node_modules/et-line/style.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./assets/animated.css";
import "./assets/style.scss";
import "./assets/style_grey.scss";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";

//redux store
import { Provider } from "react-redux";
import store from "./store/index";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
