import React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { PrimaryButtonProps } from "../../../types/buttonsType";
import { motion } from "framer-motion";

const AuthButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      className="rounded-full bg-GreenishYellow border-primary w-28 md:w-32 h-10 md:h-11 font-teko text-NightBlack md:text-2xl text-xl flex items-center justify-center space-x-1"
      onClick={onClick}
    >
      <span>{text}</span>
      <IconChevronRight size={20} strokeWidth={3} />
    </motion.button>
  );
};

export default AuthButton;
