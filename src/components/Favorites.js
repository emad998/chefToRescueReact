import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogoutState,
  selectUserEmail,
  selectUserName,
  selectUserId,
} from "../features/userSlice";
import { useHistory, Link } from "react-router-dom";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import axios from "axios";

function Favorites() {
    const [mealData, setMealData] = useState(null)
  const [yourLikes, setYourLikes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([])
  const [imageSrc, setImageSrc] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')
  const [deleting, setDeleting] = useState(false)

  const dispatch = useDispatch();
  let history = useHistory();
  let docId = uuidv4();
  

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  //   read current likes

  useEffect(() => {
    const unsubscribe = db.collection("users")
    .doc(userEmail)
    .onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      setYourLikes(doc.data().likes);
    });
    return unsubscribe
  }, [deleting])

  

  const handleShowMeal = (e, idOfMeal) => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idOfMeal}`)
    .then((res) => 
    {setMealData(res)
    let property = "";
        let ingredientsArray = [];
        let measuresArray = []
        for (property in res.data.meals[0]) {
          for (let i = 0; i <= 20; i++) {
            if (property == "strIngredient" + i) {
              ingredientsArray.push(res.data.meals[0][property]);
            }
          }
        }
        for (property in res.data.meals[0]) {
            for (let i = 0; i <= 20; i++) {
              if (property == "strMeasure" + i) {
                measuresArray.push(res.data.meals[0][property]);
              }
            }
        }

        setIngredients(ingredientsArray);
        setMeasures(measuresArray)
        setImageSrc(res.data.meals[0].strMealThumb)
        setYoutubeLink(res.data.meals[0].strYoutube)
    })
  };

  const handleDeleteMeal = (e, nameOfMeal, idOfMeal) => {
    db.collection('users').doc(userEmail).update({
        likes: firebase.firestore.FieldValue.arrayRemove({mealDatabaseId: idOfMeal, mealDatabaseName: nameOfMeal})
    })
    if (deleting == false) {
      setDeleting(true)
    } else if(deleting == true) {
      setDeleting(false)
    }
  }

  const handleFavoritesSignOut = () => {
    dispatch(setUserLogoutState());
    history.push("/");
  };


  return (
    <div>
      <h1>Welcome to Favorites</h1>
      <h3>Your current Favorites</h3>
      <Link to="/welcome">Welcome Page</Link>
      <button onClick={handleFavoritesSignOut}>SignOut</button>
    
        {yourLikes &&
          yourLikes.map((oneLike, index) => (
            <div key={index}>
                <h5>{oneLike.mealDatabaseName}</h5>
                <button onClick={(e) => handleShowMeal(e, oneLike.mealDatabaseId)}>Show Meal</button>
                <button onClick={(e) => handleDeleteMeal(e, oneLike.mealDatabaseName, oneLike.mealDatabaseId)}>Delete Meal</button>
            </div>
          ))}


        {mealData &&
        <>
        <h1 className='centeringText'>Meal Name: {mealData.data.meals[0].strMeal}</h1>
          <h1 className='centeringText'>Cuisine: {mealData.data.meals[0].strArea}</h1>
          <h1 className='centeringText'>Category: {mealData.data.meals[0].strCategory}</h1>
        
            <div className='displaying'>
          <h5>Ingredients</h5>
          <ul>
            {ingredients.map((ingredient, index) => {
              if (ingredient) {
                return <li key={index}>{ingredient}</li>;
              }
            })}
          </ul>
         

          
          <h5>Measure</h5>
          <h5>Measure</h5>
          <ul>
            {measures.map((measure, index) => {
             
              if (measure && measure != ' ') {
                return <li key={index}>{measure}</li>;
              }
            })}
          </ul>
          </div>
        
        <img src={imageSrc} alt="meal photo" className='imageResponsive bordering'/>
        <br />
        <p className="centeringText">
        <a href={youtubeLink} >Meal Video</a>
        </p>
        </>
        }
    </div>
  );
}

export default Favorites;
