import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const cardOptions = [
  { id: "feeds", label: "Feeds" },
  { id: "attendance", label: "Attendance" },
  { id: "holidays", label: "Holidays" },
  { id: "todo", label: "To-Do" },
];

const AddCardMenu = ({ onAdd }) => (
  <Menu>
    <MenuHandler>
      <IconButton variant="outlined" size="sm">
        <EllipsisVerticalIcon className="h-5 w-5" />
      </IconButton>
    </MenuHandler>
    <MenuList>
      {cardOptions.map((option) => (
        <MenuItem key={option.id} onClick={() => onAdd(option.id)}>
          {option.label}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default AddCardMenu;
