import React from "react";
import TowFactorIcon from "../../../public/twoFactorIcon.svg";
import CodeQr from "../../../public/codeQR.svg";
import Image from "next/image";
import UserInput from "../ui/inputs/userInput";
import { useState } from "react";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import Qrcode from './Qrcode'
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
  }
  return (
    <div className="w-[96%]  md:w-[95%] h-[96%]   flex items-center  justify-start flex-col gap-2 md:gap-5 ">
      <div className="w-[96%] md:w[94%] h-[8%] flex flex-row items-center  justify-center gap-2 md:gap-4 ">
        <div className="md:h-[80%] " >
          <Image
            src={TowFactorIcon}
            alt="TwoFactorIcon"
            className="w-[80%] h-full flex justify-center "
          />
        </div>
        <div className="w-[75%] md:w[74%] h-full flex  items-center font-teko text-center font-semibold sm:text-xl md:text-xl lg:text-3xl xl:text-4xl ">
          TWO-FACTOR AUTHENTICATION
        </div>
      </div>
      <div className="w-[96%] h-[20%] md:h-[12%] sm:h-[12%] flex flex-col items-center ">
        <div className="w-full h-[50%] md:h-[38%] sm:h[40%] flex justify-center items-center font-poppins xl:text-xl md:text-sm text-center font-semibold ">
          Set up two-factor authentication
        </div>
        <div className="w-full h-[40%] md:h-[38%] sm:h[40%] flex justify-center  items-center text-[0.9rem] text-center font-poppins font-thin">
          Scan this QR code with your Google Authenticator App
        </div>
      </div>
      <div className="w-[96%] h-[35%] flex flex-col items-center  gap-2 ms:gap-5 ">
        <div className="w-full h-screen flex flex-col items-center justify-center ">
          <div className="w-full h-[70%] md:h-auto  md:w-auto flex items-center justify-center">
            <Qrcode code={randomCode} />
          </div>
        </div>
        <div className="w-full h-[40%] font-poppins md:text-xl  sm:text-[0.7rem] text-center ">
          Enter code from your two-factor authentication app
        </div>
      </div>
      <div className="w-[96%] h-[15%]  flex flex-col items-center justify-center ">
        <div>
          <UserInput
            placeholder="*****"
            type="password"
            label="code"
            lableColor="#303267"
            width="xl"
            regExp={/^\d{6}$/}
            isError={error}
            isDisabled={false}
            value={code}
            setError={setError}
            setValue={setCode}
          />
        </div>
      </div>
      <div className="w-[80%] h-[10%] flex flex-row items-center justify-center gap-2 md:gap-5  ">
        <div className="w-[30%] h-[50%] flex items-center justify-center ">
          <SecondaryButton text='cancel' onClick={handleCancle} />
        </div>
        <div className="w-[30%] h-[50%] flex items-center justify-center ">
          <PrimaryButton text='confirm' onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
