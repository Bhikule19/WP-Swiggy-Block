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
  const [selectedArea, setSelectedArea] = useState(() => {
    return localStorage.getItem("selectedArea") || "Canadian";
  });
  const [areasList, setAreasList] = useState([]);
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem("sortOrder") || "A-Z";
  });
  const showTitle = attributes?.showTitle ?? true;
  const showImage = attributes?.showImage ?? true;
  const showRating = attributes?.showRating ?? true;
  const showFilterButtons = attributes?.showFilterButtons ?? true;

  const generateRandomRating = () => {
    return (Math.random() * 4 + 1).toFixed(1);
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await response.json();
        console.log("This is the list of Areas", data.meals);
        setAreasList(data.meals);
      } catch (error) {
        console.error("Failed to fetch areas", error);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
        );
        const data = await response.json();
        // console.log(data);
        // -----------------Sort the meals based on sortOrder--------------------
        const sortedMeals = data.meals.sort((a, b) => {
          if (sortOrder === "A-Z") {
            return a.strMeal.localeCompare(b.strMeal);
          } else if (sortOrder === "Z-A") {
            return b.strMeal.localeCompare(a.strMeal);
          }
          return 0;
        });
        setMealsList(sortedMeals);
        localStorage.setItem("selectedArea", selectedArea);
        localStorage.setItem("sortOrder", sortOrder);
      } catch (error) {
        console.error("Failed to fetch meals", error);
      }
    };
    fetchMeals();
  }, [selectedArea, sortOrder]);

  const handleRatingFilter = () => {
    return console.log("Filter Button Clicked");
  };

  return (
    <>
      {/* --------------------------Filter Buttons ---------------------------------- */}
      {showFilterButtons ? (
        <div className="swiggy-frontend-button">
          <div className="swiggy-frontend-button_filter">
            <label htmlFor="area-select">Filter By Area: </label>
            <select
              id="area-select"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              {areasList.map((area, index) => (
                <option key={index} value={area.strArea}>
                  {area.strArea}
                </option>
              ))}
            </select>
          </div>
          <div className="swiggy-frontend-button_filter">
            <label htmlFor="order-select">Sort By: </label>
            <select
              id="order-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
          <div className="swiggy-frontend-button_filter">
            <button
              className="swiggy-frontend-button-filter"
              onClick={handleRatingFilter}
            >
              Filter
            </button>
          </div>
        </div>
      ) : null}
      {/* --------------------------Food List Block ------------------------------------ */}
      <div className="swiggy-frontend-block">
        {mealsList.map((meal) => (
          <div className="swiggy-frontend-block_wrapper" key={meal.idMeal}>
            {showImage ? (
              <div className="swiggy-frontend-block_thumbnail">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
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
    </>
  );
}
