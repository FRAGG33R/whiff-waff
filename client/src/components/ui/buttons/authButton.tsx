import React from "react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { PrimaryButtonProps } from "../../../types/buttonsType";
import { motion } from "framer-motion";

const AuthButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      className={`rounded-full bg-GreenishYellow border-primary w-28 md:w-32 h-10 md:h-11 font-teko text-NightBlack md:text-2xl text-xl flex ${text == "Previous" ? "flex-row-reverse" : "flex-row"} flex-row items-center justify-center `}
      onClick={onClick}
    >
      <span className={`${text === "Previous" ? 'pt-1' : 'pt-[0.15rem]'}`}>{text}</span>
      {text == "Previous" ?  <IconChevronLeft size={20} strokeWidth={3}/> : (
        <IconChevronRight size={20} strokeWidth={3} />
      )}
    </motion.button>
  );
};

export default AuthButton;
