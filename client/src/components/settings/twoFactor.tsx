import React, { use, useEffect } from "react";
import TowFactorIcon from "../../../public/twoFactorIcon.svg";
import Image from "next/image";
import UserInput from "../ui/inputs/settingsInputs";
import { useState } from "react";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import Qrcode from "./Qrcode";
import { KeyboardEvent } from "react";
import { api } from "../axios/instance";
import { useRecoilState } from "recoil";
import { loggedUserAtom, userAtom } from "@/context/RecoilAtoms";
import { userType } from "@/types/userType";

const TwoFactor = () => {
  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [error, setError] = useState(false);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const [enable, setEnable] = useState(false);
  const jwtToken = localStorage.getItem("token");

  const handleCancle = () => {
    setCode("");
    setError(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
		if (pin.length > 0)
			handlePin();
		else if (code.length > 0)
      		handleConfirm();
    }
  };

  const handlePin = async () => {
    if (!pin.match(/^[0-9]{6}$/)) {
      setPinError(true);
    }
    try {
      const response = await api.post(
        "auth/disable-2fa",
        {
          id: (userData as userType).id,
          pin: "2",
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setEnable(response.data.otpEnable);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleConfirm = async () => {
    if (!code.match(/^[0-9]{6}$/)) {
      setError(true);
    }
    try {
      
      const response = await api.post(
        "/auth/verify-2fa",
        {
          id: (userData as userType).id,
          pin: code,
        } ,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
        setEnable(response.data);

    } catch (error) {
      console.error("Error sending POST request:", error);
    }
	setCode("");
  };

  useEffect(() => {
    setEnable((userData as userType).otpEnable);
  }, []);
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
      {enable === false ? (
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
          <Qrcode />
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
      </div>)
      :(
        <div className=" w-full h-full flex flex-col items-center justify-center">
          <div className="  w-[70%] h-[20%]  flex font-poppins text-[0.7rem] items-center justify-center   md:text-[0.8rem] sm:text-[0.7rem] lg:text-[1rem] xl:text-[1.3rem]  text-center">
              Click to disable your two-factor authentication app
            </div>
        <div className="w-full h-[20%] md:h-[20%] flex flex-col items-center justify-center gap-2 md:gap-4">
            <PrimaryButton text="Disable" onClick={handlePin} />
      </div>
     </div>
      )
      }
    </div>
  );
};

export default TwoFactor;
