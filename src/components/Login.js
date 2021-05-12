import React from "react";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogoutState,
  selectUserEmail,
  selectUserName,
  selectUserId
} from "../features/userSlice";
import './Login.css'
import { Button } from 'reactstrap';
import { useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  const handleSignIn = () => {
    auth.signInWithPopup(provider).then((result) => {
        console.log(result)
      dispatch(
        setActiveUser({
          userName: result.user.displayName,
          userEmail: result.user.email,
          userId: result.user.uid
        })
      );
      history.push('/welcome')
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
          <Button onClick={handleSignOut} color="danger" size="lg">Sign out</Button>
        ) : (
          <Button onClick={handleSignIn} color="primary" size="lg">Sign In</Button>
        )}
      </div>
    </div>
  );
}

export default Login;
