import Edit from "./Edit";
import "./index.scss";

wp.blocks.registerBlockType("ourplugin/my-swiggy-block", {
  edit: Edit,
  save: function (props) {
    return null;
  },
});
