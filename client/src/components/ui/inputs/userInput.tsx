import React from "react";
import { InputProps } from "../../../types/inputsType";

const UserInput: React.FC<InputProps> = ({
  label,
  isError = false,
  setError,
  placeholder,
  isDisabled = false,
  type = "text",
  lableColor = "black",
  width = "sm",
  regExp,
  value,
  setValue,
}) => {
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
        className={`flex items-center  text-PastelGrey justify-center absolute min-w-1 px-3 h-5  sm:h-4 md:h-5 -top-3 left-4 font-poppins text-sm md:text-md`}
        style={{ backgroundColor: lableColor }}
      >
        <label>{label}</label>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={`bg-transparent rounded-full font-poppins text-md placeholder-PastelGrey placeholder-left pl-8 border-2 border-Mercury
         focus:outline-none
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
            ? "w-full sm:w-56 md:w-44 lg:w-[13rem] xl:w-[15rem] 2xl:w-[18rem]   h-12   lg:h-12 text-sm md:text-md"
            : width === "2xl"
            ? "w-full  md:w-96 lg:w-[29rem] xl:w-[35rem] 2xl:w-[43rem] 3xl:w-[48rem] h-12 "
            : ""
        }`}
      ></input>
    </div>
  );
};

export default UserInput;
