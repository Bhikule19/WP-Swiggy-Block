import { useState, useEffect } from "@wordpress/element";
import { ToggleControl, Button, PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import "./edit.scss";
import CustomDropdown from "./CustomDropdown"; // Import the reusable component
import "./CustomDropdown.scss";

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const { showTitle, showImage, showRating, showFilterButtons } = attributes;

  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
        );
        const data = await response.json();
        setMealsList(data.meals);
      } catch (error) {
        console.error("Failed to fetch meals", error);
      }
    };
    fetchMeals();
  }, []);

  const generateRandomRating = () => {
    return (Math.random() * 4 + 1).toFixed(1);
  };

  return (
    <>
      <InspectorControls>
        <PanelBody>
          <ToggleControl
            label="Show Title "
            checked={showTitle}
            onChange={(value) => setAttributes({ showTitle: value })}
            help={showTitle ? "Showing Title" : "Removed Title"}
          />
          <ToggleControl
            label="Show Image"
            checked={showImage}
            onChange={(value) => setAttributes({ showImage: value })}
            help={showImage ? "Showing Image" : "Removed Image"}
          />
          <ToggleControl
            label="Show Rating"
            checked={showRating}
            onChange={(value) => setAttributes({ showRating: value })}
            help={showRating ? "Showing Rating" : "Removed Rating"}
          />
          <ToggleControl
            label="Show Filter Buttons"
            checked={showFilterButtons}
            onChange={(value) => setAttributes({ showFilterButtons: value })}
            help={
              showFilterButtons
                ? "Showing Filter Buttons"
                : "Removed Filter Buttons"
            }
          />
        </PanelBody>
      </InspectorControls>

      {/* --------------------------- */}
      <h2>Random Canadian Meals</h2>
      {/* Dropdown Button */}
      {showFilterButtons ? (
        <div className="swiggy-edit-button">
          <CustomDropdown
            buttonLabel="Select Area"
            options={["Canadian", "Italian", "Indian", "Mexican", "Chinese"]}
          />
          <CustomDropdown buttonLabel="Sort By" options={["A-Z", "Z-A"]} />
          <Button className="button button-filter">Fast Delivery</Button>
          <Button className="button button-filter">Ratings</Button>
          <Button className="button button-filter">Fast Delivery</Button>
          <Button className="button button-filter">Pure Veg</Button>
        </div>
      ) : null}
      {/* -------------------------------------------------------- */}

      <div className="swiggy-edit-block">
        {mealsList.map((meal) => (
          <div className="swiggy-edit-block_wrapper" key={meal.idMeal}>
            {showImage ? (
              <div className="swiggy-edit-block_img">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
            ) : null}

            <div className="swiggy-edit-block_info">
              {showTitle ? (
                <h2 className="swiggy-edit-block_title">{meal.strMeal}</h2>
              ) : (
                ""
              )}
              {showRating ? (
                <div className="swiggy-edit-block_rating">
                  {generateRandomRating()}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Edit;
