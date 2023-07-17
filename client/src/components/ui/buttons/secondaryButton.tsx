import React from 'react'
import {  PrimaryButtonProps } from '../../../types/buttonsType';

const secondaryButton: React.FC<PrimaryButtonProps> = ({text, onClick}) => {
  return (
    <button
		onClick={onClick}
        className='flex items-center justify-center transparent font-teko   border-2 border-Ceramic
        rounded-full w-24 md:w-28 lg:w-32  h-5 md:h-6 lg:h-7 text-Ceramic'>
        <span>{text}</span>
    </button>
  )
}

export default secondaryButton

