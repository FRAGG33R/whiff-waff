import React from "react";
import TowFactorIcon from "../../../public/twoFactorIcon.svg";
import Image from "next/image";
import UserInput from "../ui/inputs/userInput";
import { useState } from "react";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import Qrcode from "./Qrcode";
import axios from "axios";
import { KeyboardEvent } from "react";
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };
  const handleConfirm = async () => {
    let result = false;

    if (code === randomCode && code.match(/^[0-9]{6}$/)) {
      result = true;
    }

    try {
      const jwtToken = localStorage.getItem("token");
      const response = await axios.patch(
        "http://e3r10p16.1337.ma:3001/api/v1/settings/",
        { result },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("POST request successful:", response.data);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 md:gap-6  ">
      <div className="w-full h-[6%]  md:h-[10%] flex flex-row items-center space-x-2 md:space-x-4 px-3 md:px-10 md:py-2  ">
        <Image
          src={TowFactorIcon}
          alt="two factor icon"
          className="w-7 md:w-10"
        />
        <div className="font-semibold font-teko text-md md:text-[1.9rem] 3xl:text-[2.5rem] tracking-wide text-Mercury md:pt-2">
          TWO-FACTOR AUTHENTICATION
        </div>
      </div>
      <div className="w-full h-[95%] md:h-[84%] flex flex-col gap-4 ">
        <div className="w-full h-[15%] flex flex-col ">
          <div className="w-full h-[40%] flex justify-center items-center font-poppins text-[0.9rem]  sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl 2xl:text-2xl 3xl:text-4xl text-center font-bold">
            Set up two-factor authentication
          </div>
          <div className="w-full h-[50%]  flex justify-center  items-start text-[0.5rem] sm:text-[0.7rem] md:text-sm lg:text-[1rem] xl:text-sm 2xl:text-md  3xl:text-xl text-center font-poppins  font-thin">
            Scan this QR code with your Google Authenticator App
          </div>
        </div>
        <div className="w-full h-[80%] flex flex-col items-center justify-start gap-3">
          <Qrcode code={randomCode} />
          <div className="w-full h-[60%] flex flex-col  justify-start items-center gap-2 md:gap-4">
            <div className="  w-[12rem] sm:w-[13rem]   md:w-[15rem] lg:w-[18rem] xl:w-[22rem] h-[20%]  flex font-poppins text-[0.7rem]   md:text-[0.8rem] sm:text-[0.7rem] lg:text-[1rem] xl:text-[1.3rem]  text-center">
              Enter code from your two-factor authentication app
            </div>
            <div className="w-[12rem] sm:w-[13rem]   md:w-[15rem] xl:w-[60%] h-[60%] md:h-[70%] flex flex-col items-center justify-center gap-2 md:gap-4">
              <div className="w-[12rem] sm:w-[13rem] md:w-[15rem] lg:w-[18rem] xl:w-[18rem]   h-full flex flex-col items-center justify-center">
                <div className="">
                  <UserInput
                    handleKeyDown={handleKeyDown}
                    placeholder="﹡﹡﹡﹡﹡﹡"
                    type="text"
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
                  {error === true && (
                    <p className="text-md  text-red-500   flex items-center justify-center  font-poppins ">
                      Invalide code
                    </p>
                  )}
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
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
