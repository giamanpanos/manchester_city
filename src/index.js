import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/app.css";
import { getAuth } from "firebase/auth";
import Routes from "./Routes";

const App = (props) => {
  return <Routes {...props} />;
};

getAuth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});
