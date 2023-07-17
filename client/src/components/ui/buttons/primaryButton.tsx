import { type } from 'os'
import React from 'react'
import { PrimaryButtonProps } from '@/types/buttonsType'

const PrimaryButton: React.FC<PrimaryButtonProps> = ({text, onClick}) => {
  return (
    <button
		onClick={onClick}
        className='flex items-center justify-center bg-GreenishYellow font-teko rounded-full w-32 lg:w-36  h-8 md:h-6 lg:h-10 text-NightBlack text-2xl'>
        <div className='flex items-center justify-center'>{text}</div>
    </button>
  )
}

export default PrimaryButton