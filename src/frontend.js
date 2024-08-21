import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const divsToUpdate = document.querySelectorAll(".swiggy-food-block-list");

divsToUpdate.forEach(function (div) {
  const root = ReactDOM.createRoot(div);
  root.render(<FoodList />);
});

function FoodList() {
  const [mealsList, setMealsList] = useState([]);

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
    <div>
      {mealsList.map((meal) => (
        <div key={meal.idMeal}>
          <h2>{meal.strMeal}</h2>
          {/* <img src={meal.strMealThumb} alt={meal.strMeal} /> */}
        </div>
      ))}
    </div>
  );
}
