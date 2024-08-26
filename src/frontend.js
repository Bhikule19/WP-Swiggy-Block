import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Logo from "./Swiggylogo.png";

import "./frontend.scss";

document.addEventListener("DOMContentLoaded", function () {
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
        <div className="frontend-header">
          {/* <img src={Logo} alt="Swiggy Logo" className="swiggy-logo" />
          <svg
            class="_1GTCc"
            viewBox="5 -1 12 25"
            height="17"
            width="17"
            fill="#686b78"
          >
            <path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path>
          </svg>
          <h1>Swiggy Food Delivery</h1> */}
          <header class="header">
            <nav>
              <div class="nav-container">
                <div class="logo-container">
                  <img src={Logo} alt="logo" class="logo" />
                </div>
                <div class="search-container">
                  <div class="search-wrapper">
                    <input
                      type="search"
                      placeholder="Search for any food item"
                      class="search-input"
                    />
                    <button class="search-button" type="button">
                      <svg
                        class="_1GTCc"
                        viewBox="5 -1 12 25"
                        height="17"
                        width="17"
                        fill="#686b78"
                      >
                        <path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
        <div className="frontend-block">
          <div className="frontend-block-info">
            <div className="swiggy-frontend--heading">
              <h2>Restaurants with online food delivery in {selectedArea}</h2>
            </div>
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
          </div>
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
                    <h2 className="swiggy-frontend-block_title">
                      {meal.strMeal}
                    </h2>
                  ) : (
                    ""
                  )}
                  {showRating ? (
                    <div className="swiggy-frontend-block_rating">
                      {generateRandomRating()}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        role="img"
                        aria-hidden="true"
                        strokeColor="rgba(2, 6, 12, 0.92)"
                        fillColor="rgba(2, 6, 12, 0.92)"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                        ></circle>
                        <path
                          d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                          fill="white"
                        ></path>
                        <defs>
                          <linearGradient
                            id="StoreRating20_svg__paint0_linear_32982_71567"
                            x1="10"
                            y1="1"
                            x2="10"
                            y2="19"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#21973B"></stop>
                            <stop offset="1" stop-color="#128540"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="frontend-footer">
          <footer className="bg-black text-white py-4 flex justify-center items-center h-[50vh]">
            <div className="flex flex-col ">
              <div className=" mb-2">
                <img
                  src="https://driver-media-assets.swiggy.com/drivers/q_auto,f_auto,fl_lossy,c_fill/ride-with-us/icons/footer.png"
                  alt="Swiggy Logo"
                  className="h-8 mr-4"
                />
              </div>
              <p className="text-sm">&copy; 2024 Bundl Technologies Pvt. Ltd</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
});
