import React from "react";
import { PrimaryButtonProps } from "../../../types/buttonsType";
import { motion } from "framer-motion";

const secondaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex items-center justify-center transparent font-teko border-[3px] border-HokiCl
        rounded-full w-20 sm:w-20 md:w-28  h-8 md:h-7 lg:h-9 2xl:w-32 text-Ceramic text-xl md:text-lg sm:text-[1.2rem] lg:text-2xl "
    >
      <span>{text}</span>
    </motion.button>
  );
};

export default secondaryButton;
