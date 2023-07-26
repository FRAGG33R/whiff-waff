import React from 'react'
import TowFactorIcon from "../../../public/twoFactorIcon.svg"
import Image from "next/image"
const TwoFactor = () => {
  return (
    <div className='w-[96%]  md:w-[95%] h-[96%]   flex items-center  justify-start flex-col gap-4 md:gap-10 '>
      <div className='w-[96%] md:w[94%] h-[8%] flex flex-row items-center  justify-center gap-2 md:gap-4 '>
          <Image src={TowFactorIcon} alt="TwoFactorIcon" className='w-[12%] h-full flex justify-center '/>
          <div className='w-[75%] md:w[74%] h-full flex  items-center font-teko text-center font-semibold sm:text-xl md:text-xl lg:text-3xl xl:text-4xl '>
            TWO-FACTOR AUTHENTICATION
          </div>
      </div>
      <div className='w-[96%] h-[8%] md:h-[10%] sm:h-[10%] flex flex-col items-center '>
          <div className='w-full h-[50%] md:h-[38%] sm:h[40%] flex justify-center items-center font-poppins xl:text-xl md:text-sm text-center font-semibold '>
          Set up two-factor authentication
          </div >
          <div className='w-full h-[40%] md:h-[60%] sm:h[60%] flex justify-center sm:space-y-2 items-center text-[0.7rem] text-center font-poppins font-thin	 '>
          Scan this QR code with your Google Authenticator App
          </div>
      </div>
      <div className='w-[96%] h-[33%] border border-green-500 '>

      </div>
      <div className='w-[96%] h-[8%] border border-green-500 '>
                                    
      </div>
      <div className='w-[96%] h-[10%] border border-green-500 '>

      </div>
    </div>
  )
}

export default TwoFactor