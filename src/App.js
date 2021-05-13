import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { auth, provider } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogoutState,
  selectUserEmail,
  selectUserName,
} from "./features/userSlice";
import Welcome from "./components/Welcome";
import Favorites from './components/Favorites'

function App() {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          {!userName ? (
            <Login />
          ) : (
            <Switch>
              <Route path="/welcome">
                <Welcome />
              </Route>
              <Route path="/favorites">
                <Favorites />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          )}
        </Router>
      </header>
    </div>
  );
}

export default App;
