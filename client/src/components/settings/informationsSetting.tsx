import React from "react";
import Image from "next/image";
import InformationIcons from "../../../public/informationIcons.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import UserInput from "../ui/inputs/userInput";
import { useState } from "react";
import ImageUpload from "./uploadImg";

import axios from "axios";
const InformationsSetting = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastNam] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstError, setFirstError] = useState(false);
  const [lastError, setLastError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const handleCancle = () => {
    setFirstName("");
    setEmail("");
    setLastNam("");
    setUsername("");
    setFirstError(false);
    setEmailError(false);
    setLastError(false);
    setUserError(false);
  };
  const handleConfirm = async () => {
    if (!firstName.match(/^.{3,}$/)) setFirstError(true);
    if (!lastName.match(/^.{3,}$/)) setLastError(true);
    if (!username.match(/^[a-zA-Z0-9_.]{3,16}$/)) setUserError(true);
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      setEmailError(true);
    else console.log("code is valid");
    const res = {
      firstName,
      lastName,
      username,
      email,
    };
    try {
      const req = await axios.post(
        `http://e3r10p14.1337.ma:3000/api/v1/auth/`,
        res
      );
      console.log(req);
      console.log(req.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (file: File) => {
    console.log(file);
  };
  return (
    <div className="w-[96%]  md:w-[95%] h-[98%]  flex items-start  justify-start flex-col gap-4 md:gap-6">
      <div className=" w-[99%] h-[8%] flex items-center justify-start flex-row gap-1 space-y-2 space-y-auto">
        <Image
          src={InformationIcons}
          alt="TwoFactorIcon"
          className="w-[8%] h-[80%] md:w-auto md:h-auto"
          width={10}
        />
        <div className=" w-[50%] h-[80%] md:w-auto md:h-auto flex items-end justify-start  font-teko font-semibold sm:text-xl md:text-xl lg:text-3xl xl:text-4xl">
          INFORMATION
        </div>
      </div>
      <div className=" w-full h-screen flex items-center justify-start flex-col gap-2 md:gap-4">
        <div className="b w-[90%] h-[30%] flex items-center justify-center">
          <div className="relative w-1/2">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>
          </div>
        </div>
        <div className="w-full h-[68%]  flex items-center justify-start flex-col gap-2 md:gap-4 ">
          <div className="w-[17rem]  h-[21%] md:w-[19rem] lg:w-[29rem] xl:w-[35rem]  2xl:w-[40rem] 3xl:w-[48rem]  flex flex-row items-center justify-center gap-5
             md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 ">
            <div className="w-auto sm:w-auto  ">
              <div>
                <UserInput
                  placeholder="first name"
                  type="text"
                  label="First Name"
                  lableColor="#27335c"
                  width="sml"
                  regExp={/^.{3,}$/}
                  isError={firstError}
                  isDisabled={false}
                  value={firstName}
                  setError={setFirstError}
                  setValue={setFirstName}
                />
              </div>
            </div>
            <div className="w-auto sm:w-auto  ">
              <div>
                <UserInput
                  placeholder="last name"
                  type="text"
                  label="Last Name"
                  lableColor="#283563"
                  width="sml"
                  regExp={/^.{3,}$/}
                  isError={lastError}
                  isDisabled={false}
                  value={lastName}
                  setError={setLastError}
                  setValue={setLastNam}
                />
              </div>
            </div>
          </div>
          <div className=" w-full h-[21%] flex items-center justify-center">
            <div>
              <UserInput
                placeholder="username"
                type="text"
                label="Username"
                lableColor="#293665"
                width="2xl"
                regExp={/^[a-zA-Z0-9_.]{3,16}$/}
                isError={userError}
                isDisabled={false}
                value={username}
                setError={setUserError}
                setValue={setUsername}
              />
            </div>
          </div>
          <div className=" w-full h-[21%] flex items-center justify-center">
            <div>
              <UserInput
                placeholder="Houssam@gmail.com"
                type="email"
                label="Email"
                lableColor="#293665"
                width="2xl"
                regExp={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                isError={userError}
                isDisabled={false}
                value={email}
                setError={setEmailError}
                setValue={setEmail}
              />
            </div>
          </div>
          <div className="w-[17rem] h-[21%] md:w-[19rem] lg:w-[29rem] xl:w-[35rem]  2xl:w-[40rem] 3xl:w-[48rem]  flex flex-row justify-end items-center    gap-4 md:gap-4">
            <div className="w-auto sm:w-auto  ">
              <SecondaryButton text="Discard" onClick={handleCancle} />
            </div>
            <div className="w-auto sm:w-auto ">
              <PrimaryButton text="Save" onClick={handleConfirm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationsSetting;

