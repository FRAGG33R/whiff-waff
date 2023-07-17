import React from 'react'
import { InputProps } from '../../../types/inputsType'
const userInput: React.FC<InputProps> = ({
  label,
  isError = false,
  placeholder,
  isDisabled = false,
  type = "text",
  lableColor = "black",
  width = "sm"
}) => {

  return (
    <div className="relative w-full">
      <div className=" flex items-center text-PastelGrey justify-center absolute w-24 sm:w-16 md:w-20 h-5  sm:h-4 md:h-5 -top-3 left-6 font-poppins text-xs " 
        style={{backgroundColor: lableColor}}
        >
        <label >{label}</label>
      </div>
      <input 
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
        className={`bg-transparent rounded-full font-poppins text-xs placeholder-PastelGrey placeholder-left pl-3 border-2 border-Mercury
         focus:border-2 focus:border-GreenishYellow focus:outline-none
        ${
          isError ? "border-red-500" : ""
        }
        ${
          width === "sm" ? "w-40 md:w-52 lg:w-64 h-12 md:h-10 lg:h-12 text-xs" : "w-72 sm:w-40 md:w-72 lg:w-96 h-12 md:h-10 lg:h-12 text-"
        }`}
        
        >

      </input>
    </div>
  )
}

export default userInput;