import React from "react";
import { PrimaryButtonProps } from "../../../types/buttonsType";
import { motion } from "framer-motion";

const secondaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex items-center justify-center transparent font-teko text-[1.1rem] md:text-[1.4rem] border-[3px] border-HokiCl
        rounded-full w-24 xl:w-28 2xl:w-32 h-8 md:h-9 text-Mercury"
    >
      <span>{text}</span>
    </motion.button>
  );
};

export default secondaryButton;
