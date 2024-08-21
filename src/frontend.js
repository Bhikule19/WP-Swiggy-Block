import React from "react";
import ReactDOM from "react-dom";

const divsToUpdate = document.querySelectorAll(".swiggy-food-block-list");

divsToUpdate.forEach(function (div) {
  const root = ReactDOM.createRoot(div);
  root.render(<FoodList />);
});

function FoodList() {
  return <div>Hello from React this is swiggy food react app</div>;
}
