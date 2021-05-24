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
import {db} from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase'


function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  let docId = uuidv4()

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
      let emails = []
      db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            emails.push(doc.data().userDatabaseEmail)
            

        });
        console.log(emails)
        if(emails.includes(result.user.email)) {
            history.push('/welcome')
        } else {
            db.collection("users").doc(result.user.email).set({
            userDatabaseName: result.user.displayName,
            userDatabaseEmail: result.user.email,
            userDatabaseUid: result.user.uid,
            // userDatabaseDocId: docId,
            likes: [],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        history.push('/welcome')
        console.log('success')
        }
    });

    

   
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
          <Button onClick={handleSignIn} color="primary" size="lg">Google Sign In</Button>
        )}
      </div>
    </div>
  );
}

export default Login;
