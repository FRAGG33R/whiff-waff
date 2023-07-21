import React from 'react'
import IntraIcon from '../../../../public/intraIcon.svg'
import Image from 'next/image';
import { PrimaryButtonProps } from '../../../types/buttonsType';
import { motion } from 'framer-motion';

const intraButton: React.FC<PrimaryButtonProps> = ({text, onClick }) => {
  return (
    <motion.button 
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
    	className='flex items-center justify-center  flex-row space-x-2 bg-Ceramic text-NightBlack font-teko w-40 md:w-42 lg:w-44 h-8 md:h-8 lg:h-10 rounded-md' onClick={onClick}>
        <Image src={IntraIcon } alt='intra icon' width={22} />
        <span >{text}</span>
    </motion.button>
  )
}

export default intraButton