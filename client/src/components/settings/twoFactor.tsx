import React from "react";
import TowFactorIcon from "../../../public/twoFactorIcon.svg";
import CodeQr from "../../../public/codeQR.svg";
import Image from "next/image";
import UserInput from "../ui/inputs/userInput";
import { useState } from "react";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import Qrcode from "./Qrcode";
const TwoFactor = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  function generateRandomCode() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }
  const randomCode = generateRandomCode();
  const handleCancle = () => {
    setCode("");
    setError(false);
  };

  const handleConfirm = () => {
    if (code.match(/^[0-9]{6}$/)) {
      console.log("code is valid");
    } else {
      setError(true);
    }
  };
  return (
    <div className="w-[96%]  md:w-[95%] h-[96%]   flex items-start  justify-start flex-col gap-4 md:gap-6 ">
      <div className="w-[99%] h-[8%] flex items-center justify-start flex-row gap-1 space-y-2 space-y-auto">
        <Image
          src={TowFactorIcon}
          alt="TwoFactorIcon"
          className=" w-[10%] h-[99%]  "
          width={15}
        />
        <div className=" w-[80%] h-[80%] md:w-auto md:h-auto flex items-end justify-start  font-teko font-semibold sm:text-md md:text-xl lg:text-2xl xl:text-3xl">
          TWO-FACTOR AUTHENTICATION
        </div>
      </div>
      <div className="w-full h-screen flex items-center justify-start flex-col gap-1 md:gap-2">
        <div className=" w-[90%] h-[9%] flex items-center justify-center ">
          <div className="w-full h-[50%] md:h-[38%] sm:h[40%] flex justify-center items-center font-poppins xl:text-xl md:text-sm lg:text-md text-center font-bold ">
            Set up two-factor authentication
          </div>
        </div>
        <div className=" w-[90%] h-[9%] flex items-center justify-center">
          <div className="w-full h-[40%] md:h-[38%] sm:h[40%] flex justify-center  items-center text-[0.9rem] text-center font-poppins font-thin">
            Scan this QR code with your Google Authenticator App
          </div>
        </div>
        <div className=" w-[90%] h-[40%] flex items-center justify-center">
          <div className="w-full h-[90%] md:h-auto  md:w-auto flex items-center justify-center">
            <Qrcode code={randomCode} />
          </div>
        </div>
        <div className=" w-[90%] h-[10%] flex items-start justify-center">
          <div className="w-[60%] h-[60%] font-poppins text-[0.7rem]  sm:text-[0.7rem]  md:text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] text-center ">
            Enter code from your two-factor authentication app
          </div>
        </div>
        <div className="w-full h-[25%]   sm:w-[96%] md:w-[80%] lg:w-[96%] xl:w-[96%] flex flex-col items-center justify-center gap-4 ms:gap-8">
          <div className="w-auto h-[30%] md:w-[80%] xl:w-[60%]  flex flex-col items-center justify-center">
            <div>
              <UserInput
                placeholder="*****"
                type="password"
                label="code"
                lableColor="#303267"
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
          <div className="w-full md:w-[80%] xl:w-[60%] flex flex-row justify-center space-x-2 xl:space-x-5 sm:space-x-2 gap-4 md:gap-3">
            <div className="w-auto sm:w-auto ">
              <SecondaryButton text="cancel" onClick={handleCancle} />
            </div>
            <div className="w-auto sm:w-auto ">
              <PrimaryButton text="confirm" onClick={handleConfirm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
