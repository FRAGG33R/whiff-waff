import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { motion, Variants } from "framer-motion";
import Profil from "../../../../public/Profil.svg";
import { IconUserCircle } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import Logout from "../../../../public/🦆 iconLogout_.svg";
import Image from "next/image";
import { useState } from "react";
const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const LogOut = () => {};
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className=" flex flex-col items-end justify-end "
    >
      <motion.div
        initial={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10"
      >
        <Image src={Profil} alt="channel" />
      </motion.div>

      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          padding: "0.5rem",
        }}
        className="bg-HokiCl border-0 w-40"
      >
        <motion.li variants={itemVariants}>
          <MenuItem className="flex flex-row space-y-1 items-center gap-2 h-9">
            <IconUserCircle
              size={22}
              color="#CBFC01"
              className="flex items-center"
            />
            <Typography
              variant="body2"
              className="font-teko text-xl text-Mercury"
            >
              My Profile
            </Typography>
          </MenuItem>
        </motion.li>
        <motion.li variants={itemVariants}>
          <MenuItem className="flex flex-row space-y-1 items-center gap-2 h-9">
            <IconSettings
              size={22}
              color="#CBFC01"
              className="flex items-center"
            />
            <Typography
              variant="body2"
              className="font-teko text-xl text-Mercury"
            >
              Edit Profile
            </Typography>
          </MenuItem>
        </motion.li>
        <motion.li variants={itemVariants}>
          <hr className="my-2 border-GreenishYellow " />
          <MenuItem className="flex flex-row -space-y-1 space-x-1 gap-2  h-9">
            <Image src={Logout} alt="logout" width={18} />
            <Typography
              variant="body2"
              className="font-teko text-xl text-Mercury "
              onClick={LogOut}
            >
              Log Out
            </Typography>
          </MenuItem>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default ProfileDropDown;
