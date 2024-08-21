import Edit from "./Edit";

wp.blocks.registerBlockType("ourplugin/my-swiggy-block", {
  title: "My Swiggy Block",
  icon: "smiley",
  category: "common",
  attributes: {},
  edit: Edit,
  save: function (props) {
    return null;
  },
});
