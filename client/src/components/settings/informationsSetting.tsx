import React from "react";
import Image from "next/image";
import InformationIcons from "../../../public/informationIcons.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import UserInput from "../ui/inputs/userInput";
import { useState } from "react";
const InformationsSetting = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastNam] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  return (
    <div className="w-[96%]  md:w-[95%] h-[98%]   flex items-center  justify-start flex-col gap-2 md:gap-5 ">
      <div className="w-[96%] md:w[94%] h-[8%] md:h-[7%]  flex flex-row items-center  justify-center gap-2 md:gap-4">
        <div className="md:h-[80%] ">
          <Image
            src={InformationIcons}
            alt="TwoFactorIcon"
            className="w-[70%] h-full flex items-center justify-center  "
            width={10}
          />
        </div>
        <div className="w-[75%] md:w-[74%] h-full  flex  items-center font-teko text-center font-semibold sm:text-xl md:text-xl lg:text-3xl xl:text-4xl ">
          IFORMATIONS
        </div>
      </div>
      <div className="w-full h-[80%] md:h-[88%] flex flex-col items-center justify-center gap-4 md:gap-10 border border-red-200">
        <div className="w-[90%] h-[25%] flex border border-red-200"></div>
        <div className=" w-[96%] h-[70%] flex flex-col items-center  gap-2 md:gap-4">
          <div className="w-[80%] h-[20%]  flex flex-row items-center  justify-betweeb gap-1 md:gap-2 ">
            <div className="w-[45%] h-[90%] flex items-center justify-center ">
              <div>
                <UserInput
                  placeholder="first name"
                  type="text"
                  label="First Name"
                  lableColor="#263357"
                  width="sml"
                  regExp={/^.{3,}$/}
                  isError={error}
                  isDisabled={false}
                  value={firstName}
                  setError={setError}
                  setValue={setFirstName}
                />
              </div>
            </div>
            <div className="w-[45%] h-[90%] flex items-center justify-center  ">
              <div>
                <UserInput
                  placeholder="last name"
                  type="text"
                  label="Last Name"
                  lableColor="#263357"
                  width="sml"
                  regExp={/^.{3,}$/}
                  isError={error}
                  isDisabled={false}
                  value={lastName}
                  setError={setError}
                  setValue={setLastNam}
                />
              </div>
            </div>
          </div>
          <div className="w-[90%] h-[25%]  flex items-center justify-center ">
            <div>
              <UserInput
                placeholder="username"
                type="text"
                label="Username"
                lableColor="#263357"
                width="2xl"
                regExp={/^.{3,}$/}
                isError={error}
                isDisabled={false}
                value={username}
                setError={setError}
                setValue={setUsername}
              />
            </div>
          </div>
          <div className="w-[90%] h-[15%] flex items-center justify-center ">
            <div>
              <UserInput
                placeholder="username"
                type="text"
                label="Username"
                lableColor="#263357"
                width="2xl"
                regExp={/^.{3,}$/}
                isError={error}
                isDisabled={false}
                value={username}
                setError={setError}
                setValue={setUsername}
              />
            </div>
          </div>
          <div className="w-[90%] h-[10%] flex items-center justify-end">
            <div className="w-[30%] h-[50%] flex items-center justify-center ">
              <SecondaryButton text="cancel" />
            </div>
            <div className="w-[30%] h-[50%] flex items-center justify-center ">
              <PrimaryButton text="confirm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationsSetting;
