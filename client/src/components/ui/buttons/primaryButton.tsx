import { type } from 'os'
import React from 'react'
import { PrimaryButtonProps } from '@/types/buttonsType'
import { motion } from 'framer-motion'

const PrimaryButton: React.FC<PrimaryButtonProps> = ({text, onClick}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.9 }}
		onClick={onClick}
        className='flex items-center justify-center bg-GreenishYellow font-teko rounded-full w-32 lg:w-36  h-9 md:h-6 lg:h-10 text-NightBlack text-2xl'>
        <div className='flex items-center justify-center pt-1'>{text}</div>
    </motion.button>
  )
}

export default PrimaryButton