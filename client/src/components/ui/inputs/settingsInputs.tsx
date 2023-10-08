import React from "react";
import { InputProps } from "../../../types/inputsType";

const UserInput: React.FC<InputProps> = ({
  label,
  isError = false,
  setError,
  placeholder,
  isDisabled = false,
  type = "text",
  lableColor = "#FF0000",
  width = "sm",
  regExp,
  value,
  setValue,
  handleKeyDown,
}) => {

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (regExp.test(value)) setError(false);
    else setError(true);
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center  text-PastelGrey justify-center absolute min-w-1 px-3 h-5  sm:h-4 md:h-5 -top-3  left-2 sm:left-4 md:left-4 lg:left-4
        xl:left-4 2xl:left-4 3xl:left-4 font-poppins text-sm md:text-md ${lableColor}`}
      >
        <label className="text-[0.6rem] sm:text-[0.9rem] md:text-[0.8rem] lg:text-[1rem] xl:text-[1rem] 2xl:text-[1rem] 3xl:text-[1.2rem] ">  {label}</label>
      </div>
      <input
	    autoComplete="new-password"
        type={type}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={`bg-transparent rounded-full  sm:text-[0.9rem]   text-PastelGrey pl-4 sm:pl-6 md:pl-6 border-2 border-Mercury text-bottom font-poppins
         focus:outline-none flex justify-center items-center
        ${isError ? "border-red-500 " : "focus:border-GreenishYellow"}
        ${
          width === "sm"
            ? "w-40 md:w-52 lg:w-64 h-12 text-sm"
            : width === "md"
            ? "w-66 md:w-72 lg:w-96 md:h-14 h-12 text-sm md:text-md"
            : width === "lg"
            ? "w-72 sm:w-40 md:w-72 lg:w-96 h-12 "
            : width === "xl"
            ? "w-40 sm:w-52 md:w-52 lg:w-72 md:h-12 h-10 text-sm md:text-md"
            : width === "sml"
            ? "w-[6rem] sm:w-[10.5rem] smd:w-[8rem]  md:w-[10rem] lg:w-[14.2rem] xl:w-[14rem] 2xl:w-[15.5rem] 3xl:w-[25.5rem]  h-7  md:h-10 sm:h-10 lg:h-14  xl:h-14 3xl:h-16  text-[0.7rem] sm:text-lg md:text-md lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl"
            : width === "2xl"
            ? "w-[13rem]  sm:w-[22rem]  md:w-[22rem] lg:w-[31rem] xl:w-[31rem] 2xl:w-[35rem] 3xl:w-[54rem] h-9 md:h-10 sm:h-10 lg:h-14 xl:h-14 3xl:h-16 text-sm sm:text-lg md:text-md lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl"
            : width === "code"
            ? "w-[12rem]  sm:w-[13rem]  md:w-[15rem] lg:w-[18rem] xl:w-[18rem]  md:h-12 h-10 3xl:h-14  placeholder:sm:text-[1.7rem] sm:text-5xl placeholder:lg:text-[2.3rem] lg:text-2xl   "
            : width === "channel"
            ? "w-[12rem]  sm:w-[13rem]  md:w-[15rem] lg:w-[18rem] xl:w-[18rem]  md:h-12 h-10 3xl:h-14  placeholder:sm:text-[1.7rem] text-sm sm:text-lg md:text-md lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl  "
            : ""
        }`}
      ></input>

    </div>
  );
};

export default UserInput;