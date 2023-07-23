import React from "react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { motion } from "framer-motion";
import IconChannel from "../../../../public/IconChannel.svg";
import Ban from "../../../../public/Ban.svg";
import IconKick from "../../../../public/Kick.svg";
import Admin from "../../../../public/Admin.svg";
import Image from "next/image";
const UserChannelDropDown = () => {
  const OptionClick = () => {};

  return (
    <Menu>
      <MenuHandler>
        <motion.div initial={{ scale: 0.9 }} whileHover={{ scale: 1 }}>
          <Image src={IconChannel} alt="channel" />
        </motion.div>
      </MenuHandler>
      <MenuList className="bg-HokiCl border-0 ">
        <MenuItem
          className="flex flex-row  -space-y-1 space-x-3  h-9 "
          onClick={() => OptionClick()}
        >
          <Image src={Ban} alt="Ban" width={22} />
          <Typography className="flex  font-teko text-2xl text-Mercury ">
            Ban
          </Typography>
        </MenuItem>
        <MenuItem
          className="flex flex-row -space-y-1 space-x-2 gap-2  h-9 "
          onClick={() => OptionClick()}
        >
          <Image src={IconKick} alt="Kick" width={20}  />

          <Typography className="flex font-teko text-2xl text-Mercury">
            Kick
          </Typography>
        </MenuItem>
        <MenuItem
          className="flex flex-row -space-y-1 space-x-1 gap-2  h-9"
          onClick={() => OptionClick()}
        >
          <Image src={Admin} alt="Admin" width={22} />
          <Typography className="font-teko text-2xl text-Mercury">
            As Admin
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default UserChannelDropDown;
