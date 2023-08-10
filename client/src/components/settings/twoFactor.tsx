import React from "react";
import TowFactorIcon from "../../../public/twoFactorIcon.svg";
import Image from "next/image";
import UserInput from "../ui/inputs/userInput";
import { useState } from "react";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import Qrcode from "./Qrcode";
const TwoFactor = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const randomCode = useState(generateRandomCode())[0];

  function generateRandomCode() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }

  const handleCancle = () => {
    setCode("");
    setError(false);
  };

  const handleConfirm = () => {
    if (code === randomCode && code.match(/^[0-9]{6}$/)) {
      console.log("code is valid");
    } else {
      setError(true);
    }
  };
  return (
    <div className="w-[96%]  md:w-[95%]   h-full flex items-center   justify-center    flex-col gap-4 md:gap-6  ">
      <div className="w-full h-full  flex items-center justify-center flex-row  space-y-1 sm:space-y-2 md:space-y-2 lg:space-y-1 xl:space-y-1 space-x-1 sm:space-x-1 lg:space-x-2 xl:space-x-2  2xl:space-x-2">
        <Image
          src={TowFactorIcon}
          alt="TwoFactorIcon"
          className="w-[30px] h-full"
        />
        <div className="w-full  flex items-center justify-start font-teko font-semibold text-xl sm:text-2xl md:text-2xl lg:text-[1.5rem] xl:text-[1.7rem] 2xl:text-3xl ">
          TWO-FACTOR AUTHENTICATION
        </div>
      </div>
      <div className="w-full h-full  flex flex-col items-center justify-center ">
        <div className="w-full h-full  flex justify-center items-center font-poppins text-[0.8rem] xl:text-xl sm:text-[1rem] md:text-2xl lg:text-[1.1rem] 2xl:text-[1.6rem]  text-center font-bold ">
          Set up two-factor authentication
        </div>
        <div className="w-full h-full  flex justify-center  items-start text-[0.6rem] sm:text-[0.8rem] md:text-lg lg:text-md text-center font-poppins  font-thin">
          Scan this QR code with your Google Authenticator App
        </div>
      </div>
      <div className=" w-full h-full flex items-center justify-center flex-col gap-2 ">
        <div className="w-full h-full  flex items-center justify-center">
          <Qrcode code={randomCode} />
        </div>
        <div className="w-[55%] h-fullfont-poppins text-[0.7rem]   md:text-[0.8rem] sm:text-[0.7rem] lg:text-[1rem] xl:text-[1rem]  text-center ">
          Enter code from your two-factor authentication app
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center flex-col gap-4">
        <div className="w-[12rem] sm:w-[13rem] h-full flex flex-col items-center justify-center">
          <div>
            <UserInput
              placeholder="*****"
              type="password"
              label="code"
              lableColor="bg-[#2c3569] sm:bg-[#2c3569] md:bg-[#2f3268] lg:bg-[#322f65] xl:bg-[#322f65] 2xl:bg-[#322f65] 3xl:bg-[#322f65]"
              width="code"
              regExp={/^\d{6}$/}
              isError={error}
              isDisabled={false}
              value={code}
              setError={setError}
              setValue={setCode}
            />
          </div>
        </div>
        <div className="w-[12rem] sm:w-[13rem]   md:w-[15rem] xl:w-[60%] h-full flex flex-row justify-center space-x-2 md:space-x-2 xl:space-x-5 sm:space-x-8 gap-4 md:gap-3">
          <div className="w-auto sm:w-auto ">
            <SecondaryButton text="cancel" onClick={handleCancle} />
          </div>
          <div className="w-auto sm:w-auto ">
            <PrimaryButton text="confirm" onClick={handleConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
