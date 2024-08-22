import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./frontend.scss";

const divsToUpdate = document.querySelectorAll(".swiggy-food-block-list");

divsToUpdate.forEach(function (div) {
  const data = JSON.parse(div.getAttribute("data-attributes") || "{}");
  // console.log("This is the parsed data", data);
  console.log("Raw data-attributes:", div.getAttribute("data-attributes"));
  console.log("Parsed data:", data);
  // console.log("showTitle in FoodList:", showTitle);

  // Create a root node and render the component there
  const root = ReactDOM.createRoot(div);
  root.render(<FoodList attributes={data} />);
});

function FoodList({ attributes }) {
  const [mealsList, setMealsList] = useState([]);
  const showTitle = attributes?.showTitle ?? true;
  const showImage = attributes?.showImage ?? true;
  const showRating = attributes?.showRating ?? true;

  const generateRandomRating = () => {
    return (Math.random() * 4 + 1).toFixed(1);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
        );
        const data = await response.json();
        console.log(data);
        setMealsList(data.meals);
      } catch (error) {
        console.error("Failed to fetch meals", error);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="swiggy-frontend-block">
      {mealsList.map((meal) => (
        <div className="swiggy-frontend-block_wrapper" key={meal.idMeal}>
          {showImage ? (
            <img
              className="swiggy-frontend-block_thumbnail"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          ) : null}
          <div className="swiggy-frontend-block_info">
            {showTitle ? (
              <h2 className="swiggy-frontend-block_title">{meal.strMeal}</h2>
            ) : (
              ""
            )}
            {showRating ? (
              <div className="swiggy-frontend-block_rating">
                {generateRandomRating()}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
