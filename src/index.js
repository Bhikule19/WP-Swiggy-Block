import Edit from "./Edit";
import "./edit.scss";

wp.blocks.registerBlockType("ourplugin/my-swiggy-block", {
  title: "My Swiggy Block",
  icon: "smiley",
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
  },
  edit: Edit,
  save: function (props) {
    return null;
  },
});
