import React from "react";
import { PrimaryButtonProps } from "../../../types/buttonsType";
import { motion } from "framer-motion";

const secondaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex items-center justify-center transparent font-teko   border-2 border-Ceramic
        rounded-full w-20 md:w-24 lg:w-28  h-5 md:h-6 lg:h-7 text-Ceramic"
    >
      <span>{text}</span>
    </motion.button>
  );
};

export default secondaryButton;
