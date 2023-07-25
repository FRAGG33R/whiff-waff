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
        rounded-full w-24 md:w-28 lg:w-32  h-5 md:h-6 lg:h-7 text-Ceramic"
    >
      <span>{text}</span>
    </motion.button>
  );
};

export default secondaryButton;
