
import React from "react";
import { PrimaryButtonProps } from "@/types/buttonsType";
import { motion } from "framer-motion";

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {

  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex items-center justify-center bg-GreenishYellow font-teko rounded-full
       w-20 md:w-24 2xl:w-32 sm:w-20 h-8 md:h-7 lg:h-9 text-NightBlack sm:text-[1.2rem] text-xl md:text-lg lg:text-2xl "
      >
      <div className="flex items-center justify-center md:pt-1">{text}</div>
    </motion.button>
  );
};

export default PrimaryButton;