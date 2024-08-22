import { Dropdown, Button, MenuGroup, MenuItem } from "@wordpress/components";
import "./CustomDropdown.scss";

const CustomDropdown = ({ buttonLabel, options }) => {
  return (
    <Dropdown
      contentClassName="my-dropdown-content"
      renderToggle={({ onToggle }) => (
        <Button onClick={onToggle} className="button-filter">
          {buttonLabel}
        </Button>
      )}
      renderContent={() => (
        <MenuGroup label={buttonLabel}>
          {options.map((option, index) => (
            <MenuItem key={index}>{option}</MenuItem>
          ))}
        </MenuGroup>
      )}
    />
  );
};

export default CustomDropdown;
