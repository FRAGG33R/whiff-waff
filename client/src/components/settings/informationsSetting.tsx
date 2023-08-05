import React from "react";
import Image from "next/image";
import InformationIcons from "../../../public/informationIcons.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import UserInput from "../ui/inputs/userInput";
import { useState } from "react";
import ImageUpload from './uploadImg';

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
    if (!(firstName.match(/^.{3,}$/)))
      setFirstError(true);
    if (!(lastName.match(/^.{3,}$/)))
      setLastError(true);
    if (!(username.match(/^[a-zA-Z0-9_.]{3,16}$/)))
      setUserError(true);
    if (!(email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)))
      setEmailError(true);
    else
      console.log("code is valid");
    const res = {
      firstName,
      lastName,
      username,
      email,
    }
    try {
      const req = await axios.post(`http://e3r10p14.1337.ma:3000/api/v1/auth/`, res);
      console.log(req);
      console.log(req.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleImageUpload = (file: File) => {
    console.log(file);
  };
  return (
    <div className="w-[96%]  md:w-[95%] h-[98%]  flex items-center  justify-start flex-col gap-4 md:gap-6 ">
      <div className="w-[96%] md:w[94%] h-[8%] md:h-[7%]  flex flex-row items-start  justify-start gap-2 md:gap-4">
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
      <div className="w-full h-screen flex flex-col items-center justify-center gap-3 md:gap-6 ">
        <div className="w-[90%] h-[20%] flex items center justify-center ">
          <div className="relative w-1/2">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>
          </div>
        </div>
        <div className="w-[90%] md:w-[90%] lg:w-[90%] xl:w-[82%] h-[26%]  md:h-[15%] lg:h-[15%] xl:h-[15%] flex flex-col md:flex-row items-center  justify-center gap-4
           md:gap-4">
          <div className="w-full md:w-[50%] lg:w-[52%]  h-[90%] md:h-[92%] lg:[96%] flex  justify-center items-center ">
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
          <div className="w-full md:w-[50%] lg:w-[52%] h-[90%] md:h-[92%] lg:[96%]  flex items-center justify-center  ">
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
        <div className="w-[90%] h-[15%] flex items-center justify-center ">
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
        <div className="w-[90%] h-[15%] flex items-center justify-center">
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
        <div className="w-[90%] h-[15%] flex items-center justify-end  gap-2">
          <div className=" w-[30%] md:w-[31%] lg:w-[32%] h-[50%] h-[50%] md:h-[52%] lg:h-[54%] flex items-center justify-center ">
            <SecondaryButton text="Discard" onClick={handleCancle} />
          </div>
          <div className="w-[30%] md:w-[31%] lg:w-[32%] h-[50%] h-[50%] md:h-[52%] lg:h-[54%]  flex items-center justify-center ">
            <PrimaryButton text="save" onClick={handleConfirm} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default InformationsSetting;
