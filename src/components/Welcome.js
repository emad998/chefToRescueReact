import React from 'react'
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogoutState,
  selectUserEmail,
  selectUserName,
  selectUserId
} from "../features/userSlice";
import { useHistory } from "react-router-dom";

function Welcome() {
    const disptach = useDispatch()
    let history = useHistory()

    const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

    const handleWelcomeSignOut = () => {
        disptach(setUserLogoutState())
        history.push('/')

    }


    return (
        <div>
            <h1>Welcome {userName}</h1>
            <button onClick={handleWelcomeSignOut}>Sign Out</button>
            <button>Generate A meal</button>
        </div>
    )
}

export default Welcome
