import { Dropdown, Button, MenuGroup, MenuItem } from "@wordpress/components";

const CustomDropdown = ({ buttonLabel, options }) => {
  return (
    <Dropdown
      contentClassName="my-dropdown-content"
      renderToggle={({ isOpen, onToggle }) => (
        <Button isPrimary onClick={onToggle}>
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

// const CustomDropdown = ({ buttonLabel, options }) => {
//   return (
//     <Dropdown
//       contentClassName="my-dropdown-content"
//       renderToggle={({ isOpen, onToggle }) => (
//         <Button isPrimary onClick={onToggle} aria-expanded={isOpen}>
//           {buttonLabel}
//         </Button>
//       )}
//       renderContent={() => (
//         <MenuGroup label={buttonLabel}>
//           {options.map((option, index) => (
//             <MenuItem key={index}>{option}</MenuItem>
//           ))}
//         </MenuGroup>
//       )}
//     />
//   );
// };

// export default CustomDropdown;
