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
  const [error, setError] = useState(false);
  const handleCancle = () => {
    setFirstName("");
    setEmail("");
    setLastNam("");
    setUsername("");
    setError(false);
  };
  const handleConfirm = async () => {
    if ((firstName.match(/^.{3,}$/)) || (lastName.match(/^.{3,}$/)) || (username.match(/^[a-zA-Z0-9_.]{3,16}$/))
      || (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))) {
      console.log("code is valid");
    } else {
      setError(true);
    }
    const res ={
      firstName,
      lastName,
      username,
      email,
    }
    try{
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
      <div className="w-full h-[80%] md:h-[88%]  flex flex-col items-center justify-center gap-4 md:gap-10 ">
        <div className="w-[90%] h-[30%] flex items-center justify-center ">
          <div className="relative w-1/2">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>
          </div>
        </div>
        <div className=" w-full h-screen flex flex-col items-center  gap-2 md:gap-4 ">
          <div className="w-[70%]  h-[35%] md:w-auto md:h-auto lg:w-auto lg:w-auto flex flex-col md:flex-row items-center  justify-center gap-4
           md:gap-4  ">
            <div className="w-[45%] md:w-[50%] lg:w-[52%]  h-[90%] md:h-[92%] lg:[96%] flex items-start justify-center ">
              <div>
                <UserInput
                  placeholder="first name"
                  type="text"
                  label="First Name"
                  lableColor="#27335c"
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
            <div className="w-[45%] md:w-[50%] lg:w-[52%] h-[90%] md:h-[92%] lg:[96%]  flex items-start justify-center  ">
              <div>
                <UserInput
                  placeholder="last name"
                  type="text"
                  label="Last Name"
                  lableColor="#283563"
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
          <div className="w-[75%] md:w-[80%] lg:w-[90%] h-[30%] md:h-[30%] lg:h-[32%]  flex items-center justify-center">
            <div>
              <UserInput
                placeholder="username"
                type="text"
                label="Username"
                lableColor="#293665"
                width="2xl"
                regExp={/^[a-zA-Z0-9_.]{3,16}$/}
                isError={error}
                isDisabled={false}
                value={username}
                setError={setError}
                setValue={setUsername}
              />
            </div>
          </div>
          <div className="h-[50%] w-[90%] flex flex-col  items-center justify-center gap-2 md:gap-4">
            <div className="w-[90%]  md:w-[88%] lg:w-[92%] h-[50%] md:h-[46%] lg:h-[50%] flex items-center justify-center ">
              <div>
                <UserInput
                  placeholder="Nawfal@gmail.com"
                  type="email"
                  label="Email"
                  lableColor="#293769"
                  width="2xl"
                  regExp={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                  isError={error}
                  isDisabled={false}
                  value={email}
                  setError={setError}
                  setValue={setEmail}
                />
              </div>
            </div>
            <div className="w-[90%]  md:w-[88%] sm:w-[80%] lg:w-[75%]  h-[50%] md:h-[52%] lg:h-[54%] flex items-center justify-end  gap-2">
              <div className=" w-[30%] md:w-[31%] lg:w-[32%] h-[50%] h-[50%] md:h-[52%] lg:h-[54%] flex items-center justify-center ">
                <SecondaryButton text="cancel" onClick={handleCancle} />
              </div>
              <div className="w-[30%] md:w-[31%] lg:w-[32%] h-[50%] h-[50%] md:h-[52%] lg:h-[54%]  flex items-center justify-center ">
                <PrimaryButton text="confirm" onClick={handleConfirm} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InformationsSetting;
