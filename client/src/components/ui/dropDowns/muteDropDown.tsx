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
import { motion, Variants } from "framer-motion";
import { MuteProps } from "../../../types/dropDownType";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const MuteDropDown: React.FC<MuteProps> = ({ user }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectTime = (option: string) => {
    if (option === "1 hour" || option === "8 hours" || option === "always") {
      const selectedOption = option + " for user: " + user;
      setSelected(selectedOption);
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="flex flex-col items-center justify-center "
    >
      <motion.div
        initial={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10"
      >
        <IconBellOff />
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
        className="bg-HokiCl border-0 w-40  "
      >
        <motion.li variants={itemVariants}>
          <MenuItem
            className="flex flex-row justify-center items-center gap-2 h-9"
            onClick={() => selectTime("1 hour")}
          >
            <Typography className="font-teko text-2xl text-Mercury ">
              1 hour
            </Typography>
          </MenuItem>
        </motion.li>
        <motion.li variants={itemVariants}>
          <MenuItem
            className="flex flex-row justify-center items-center gap-2 h-9 "
            onClick={() => selectTime("8 hour")}
          >
            <Typography className="font-teko text-2xl text-Mercury">
              8 hours
            </Typography>
          </MenuItem>
        </motion.li>
        <motion.li variants={itemVariants}>
          <MenuItem
            className="flex flex-row justify-center items-center gap-2 h-9"
            onClick={() => selectTime("always")}
          >
            <Typography className="font-teko text-2xl text-Mercury">
              Always
            </Typography>
          </MenuItem>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};
export default MuteDropDown;
