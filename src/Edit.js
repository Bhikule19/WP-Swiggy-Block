import { useState, useEffect } from "@wordpress/element";
import { ToggleControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import "./edit.scss";

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const { showTitle, showImage } = attributes;

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

  return (
    <>
      <InspectorControls>
        <ToggleControl
          label="Show Title "
          checked={showTitle}
          onChange={(value) => setAttributes({ showTitle: value })}
          help={showTitle ? "Showing Title" : "Removing Title"}
        />
        <ToggleControl
          label="Show Image"
          checked={showImage}
          onChange={(value) => setAttributes({ showImage: value })}
          help={showImage ? "Showing Image" : "Removing Image"}
        />
      </InspectorControls>
      <div className="swiggy-edit-block">
        {mealsList.map((meal) => (
          <div className="swiggy-edit-block_wrapper" key={meal.idMeal}>
            {showImage ? (
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            ) : null}
            {showTitle ? (
              <h2 className="swiggy-edit-block_title">{meal.strMeal}</h2>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Edit;
