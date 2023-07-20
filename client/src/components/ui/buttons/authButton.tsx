import React from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { PrimaryButtonProps } from '../../../types/buttonsType';
import { motion } from 'framer-motion';
  
  const Button: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.9 }}
        className='rounded-full  bg-GreenishYellow border-primary w-20 md:w-28  lg:w-30  h-8 md:h-10 lg:h-12 font-teko  text-NightBlack flex items-center justify-center '
        onClick={onClick}
      >
        <span>{text}</span>
        <IconChevronRight size={16}/>
      </motion.button>
    );
  };

export default Button