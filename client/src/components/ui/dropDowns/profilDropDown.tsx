import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import Profil from '../../../../public/Profil.svg'
import { IconUserCircle } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import Logout from "../../../../public/🦆 iconLogout_.svg";
import Image from "next/image";
const ProfilDropDown = () => {
  const LogOut = () => {};
  return (
    <Menu placement="left-start"  >
      <MenuHandler>
        <motion.div initial={{ scale: 0.9 }} whileHover={{ scale: 1.5 }}>
          <Image src={Profil} alt="profil"  />
        </motion.div>
      </MenuHandler>
      <MenuList className="flex flex-col  bg-HokiCl border-0 ">
        <MenuItem className="flex flex-row space-y-1 items-center gap-2 h-9">
          <IconUserCircle size={22} color="#CBFC01" className="flex items-center"/>
          <Typography
            variant="body2"
            className="font-teko text-xl text-Mercury"
          >
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem className="flex flex-row space-y-1 items-center gap-2 h-9">
          <IconSettings size={22} color="#CBFC01"className="flex items-center" />
          <Typography
            variant="body2"
            className="font-teko text-xl text-Mercury"
          >
            Edit Profile
          </Typography>
        </MenuItem>
        <hr className="my-2 border-GreenishYellow " />
        <MenuItem className="flex flex-row -space-y-1 space-x-1 gap-2  h-9">
          <Image src={Logout} alt="logout" width={18}  />
          <Typography
            variant="body2"
            className="font-teko text-xl text-Mercury "
            onClick={LogOut}
          >
            Log Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfilDropDown;
