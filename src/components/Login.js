import React from "react";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogoutState,
  selectUserEmail,
  selectUserName,
} from "../features/userSlice";
import './Login.css'

function Login() {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  const handleSignIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      dispatch(
        setActiveUser({
          userName: result.user.displayName,
          userEmail: result.user.email,
        })
      );
    });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUserLogoutState());
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="welcome">
        <h1>Chef to the Rescue</h1>
        {userName ? (
          <button onClick={handleSignOut}>Sign out</button>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )}
      </div>
    </div>
  );
}

export default Login;
