import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogoutState,
  selectUserEmail,
  selectUserName,
  selectUserId,
} from "../features/userSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import './Welcome.css'

function Welcome() {
  const [mealData, setMealData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([])
  const [imageSrc, setImageSrc] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')

  const disptach = useDispatch();
  let history = useHistory();

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  const handleWelcomeSignOut = () => {
    disptach(setUserLogoutState());
    history.push("/");
  };

  const mealGenerator = () => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => {
        console.log(res.data.meals[0])
        setMealData(res);
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
      });
  };

  return (
    <div>
      <h1>Welcome {userName}</h1>
      <button onClick={handleWelcomeSignOut}>Sign Out</button>
      <button onClick={mealGenerator}>Generate A meal</button>

        
      {mealData && (
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
          <ul>
            {measures.map((measure, index) => {
             
              if (measure) {
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
      )}
      
    </div>
  );
}

export default Welcome;
