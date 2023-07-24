import React from "react";

import { MenuItem, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import IconChannel from "../../../../public/IconChannel.svg";
import Ban from "../../../../public/Ban.svg";
import IconKick from "../../../../public/Kick.svg";
import Admin from "../../../../public/Admin.svg";
import Image from "next/image";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const UserChannelDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const OptionClick = () => {};

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
        <Image src={IconChannel} alt="channel" />
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
            className="flex flex-row  -space-y-1 space-x-3  h-9 "
            onClick={() => OptionClick()}
          >
            <Image src={Ban} alt="Ban" width={22} />
            <Typography className="flex  font-teko text-2xl text-Mercury ">
              Ban
            </Typography>
          </MenuItem>
        </motion.li>
        <motion.li variants={itemVariants}>
          <MenuItem
            className="flex flex-row -space-y-1 space-x-2 gap-2  h-9  "
            onClick={() => OptionClick()}
          >
            <Image src={IconKick} alt="Kick" width={20} />
            <Typography className="flex font-teko text-2xl text-Mercury">
              Kick
            </Typography>
          </MenuItem>
        </motion.li>
        <motion.li variants={itemVariants}>
          <MenuItem
            className="flex flex-row -space-y-1 space-x-1 gap-2  h-9"
            onClick={() => OptionClick()}
          >
            <Image src={Admin} alt="Admin" width={22} />
            <Typography className="font-teko text-2xl text-Mercury">
              As Admin
            </Typography>
          </MenuItem>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};
export default UserChannelDropDown;
