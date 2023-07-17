import { type } from 'os'
import React from 'react'
import { ButtonProps } from '../../../types/buttonsType'

const PrimaryButton: React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button 
        className='flex items-center justify-center bg-GreenishYellow font-teko rounded-full w-24 md:w-28 lg:w-32  h-5 md:h-6 lg:h-7 text-NightBlack'>
        <span>{text}</span>
    </button>
  )
}

export default PrimaryButton