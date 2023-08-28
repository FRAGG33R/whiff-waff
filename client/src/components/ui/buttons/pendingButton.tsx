import React from "react";
import { PrimaryButtonProps } from "../../../types/buttonsType";
import { motion } from "framer-motion";
import { IconClockHour2 } from '@tabler/icons-react';

const PendingButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex items-center  justify-center transparent font-teko text-[1rem] md:text-[1.4rem] border-[3px] border-HokiCl
        rounded-full w-28 md:w-24 xl:w-28 2xl:w-32 h-8 2xl:h-9 text-Mercury"
    >
		<div className="min-w-1 min-h-1 flex flex-row items-center space-x-2 justify-center">
		<IconClockHour2 className="w-5 h-5" strokeWidth={2.5}/>
      <span className="pt-[0.1rem]">{text}</span>
		</div>
    </motion.button>
  );
};

export default PendingButton;
