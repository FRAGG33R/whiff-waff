import React, { useEffect } from "react";
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

  useEffect(() => {
	if(type !== 'email' && placeholder !== 'John')
    	inputRef.current?.focus();
  }, [inputRef, placeholder]);

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center  text-PastelGrey justify-center absolute min-w-1 px-3 h-5  sm:h-4 md:h-5 -top-3 left-4 font-poppins text-sm md:text-lg`}
        style={{ backgroundColor: lableColor }}
      >
        <label>{label}</label>
      </div>
      <input
	  	autoComplete="off"
        ref={inputRef}
        type={type}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={`bg-transparent rounded-full font-poppins text-md placeholder-PastelGrey placeholder-left pl-8 border-2 border-Mercury
         focus:outline-none
        ${isError ? "border-red-500" : "focus:border-GreenishYellow"}
        ${
          width === "sm"
            ? "w-40 md:w-52 lg:w-64 h-12 text-sm"
            : width === "md"
            ? "w-60 md:w-72 lg:w-96 md:h-14 h-12 text-sm md:text-md"
            : width === "lg"
            ? "w-72 sm:w-40 md:w-72 lg:w-96 h-12 "
            : ""
        }`}
      ></input>
    </div>
  );
};

export default UserInput;
