import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import axios from "./axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import firebase from "firebase";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

const App = () => {
  let isauthenticated = false;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      isauthenticated = true;
    } else {
      isauthenticated = false;
    }
  });
  const screenCheck = () => {
    if (isMobile) {
      return (
        <div className="app__body">
          <Chat />
        </div>
      );
    } else {
      return (
        <div className="app__body">
          <Sidebar />
          <Chat />
        </div>
      );
    }
  };

  return (
    <Router>
      <div
        className={`app ${
          window.location.href.includes("/login") && "app__login"
        }`}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return isauthenticated ? (
                <Redirect to="/chatroom" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/chatroom">
            {screenCheck()}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
