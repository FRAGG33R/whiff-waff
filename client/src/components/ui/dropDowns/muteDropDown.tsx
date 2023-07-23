import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { IconBellOff } from "@tabler/icons-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { MuteProps } from "../../../types/dropDownType";
const MuteDropDown: React.FC<MuteProps> = ({ user }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const selectTime = (option: string) => {
    if (option === "1 hour" || option === "8 hours" || option === "always") {
      const selectedOption = option + " for user: " + user;
      setSelected(selectedOption);
    }
  };

  return (
    <div>
      <Menu>
        <MenuHandler>
          <motion.div initial={{ scale: 0.9 }} whileHover={{ scale: 1 }}>
            <IconBellOff />
          </motion.div>
        </MenuHandler>
        <MenuList className="bg-HokiCl border-0 ">
          <MenuItem
            className="flex flex-row justify-center items-center gap-2 h-9"
            onClick={() => selectTime("1 hour")}
          >
            <Typography className="font-teko text-2xl text-Mercury ">
              1 hour
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex flex-row justify-center items-center gap-2 h-9 "
            onClick={() => selectTime("8 hour")}
          >
            <Typography className="font-teko text-2xl text-Mercury">
              8 hours
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex flex-row justify-center items-center gap-2 h-9"
            onClick={() => selectTime("always")}
          >
            <Typography className="font-teko text-2xl text-Mercury">
              Always
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
export default MuteDropDown;
