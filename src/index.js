import Edit from "./Edit";
import "./index.scss";

wp.blocks.registerBlockType("ourplugin/my-swiggy-block", {
  title: "My Swiggy Block",
  icon: "food",
  category: "common",
  attributes: {
    showTitle: {
      type: "boolean",
      default: true,
    },
    showImage: {
      type: "boolean",
      default: true,
    },
    showRating: {
      type: "boolean",
      default: true,
    },
    showFilterButtons: {
      type: "boolean",
      default: true,
    },
  },
  edit: Edit,
  save: function (props) {
    return null;
  },
});
