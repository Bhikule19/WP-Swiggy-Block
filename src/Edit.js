import { useState, useEffect } from "@wordpress/element";

const Edit = (props) => {
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
};

export default Edit;
