import React, { useEffect } from "react";
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
  const [data, setData] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://e1r13p2.1337.ma:3000/api/v1/users/profil/"
        );
        const userData = response.data;
        setFirstName(userData.firstName);
        setLastNam(userData.lastName);
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (error) {
        console.log("l9lawi");
      }
    };

    fetchData();
  }, []);
  const handleConfirm = async () => {
    if (!firstName.match(/^.{3,}$/)) setFirstError(true);
    if (!lastName.match(/^.{3,}$/)) setLastError(true);
    if (!username.match(/^[a-zA-Z0-9_.]{3,16}$/)) setUserError(true);
    else console.log("code is valid");
    const res = {
      firstName,
      lastName,
      username,
    };
    try {
      const req = await axios.post(
        `http://e1r13p2.1337.ma:3000/api/v1/users/settings/`,
        res
      );
      console.log(req);
      console.log(req.data);
    } catch (error) {
      console.log("zob");
    }
  };

  const handleImageUpload = (file: File) => {
    console.log(file);
  };
  return (
    <div className="w-[96%]  md:w-[95%] 2xl:w-full 3xl:w-full  xl:w-full lg:w-full   h-full flex items-start  justify-center flex-col gap-4 md:gap-6  ">
      <div className=" w-[80%] h-[50px] flex items-center justify-start flex-row space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-2  xl:space-y-2 space-x-1 sm:space-x-1 lg:space-x-2 xl:space-x-2 3xl:-space-x-3 2xl:-space-x-2 ">
        <Image
          src={InformationIcons}
          alt="InformationIcons"
          className="w-[10%] h-[30px] "
        />
        <div className="w-full flex items-end justify-start  font-teko font-semibold sm:text-2xl  md:text-3xl lg:text-4xl xl:text-4xl">
          INFORMATION
        </div>
      </div>
      <div className=" w-full h-[100px] sm:h-[130px] md:h-[160px] lg:h-[240px] xl:h-[240px] 2xl:h-[240px] 3xl:h-[240px] flex items-center justify-center">
        <div className="relative w-1/2">
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>
      <div className=" w-full h-full flex items-center  justify-center flex-col  gap-4 md:gap-6 ">
        <div
          className="w-full h-[21%] flex flex-row items-center justify-center gap-5
             md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 "
        >
          <div>
            <UserInput
              placeholder={firstName}
              type="text"
              label="First Name"
              lableColor="bg-[#263358] sm:bg-[#263257] md:bg-[#27335d] lg:bg-[#27345d] xl:bg-[#27345d] 2xl:bg-[#27345d] 3xl:bg-[#27345d]"
              width="sml"
              regExp={/^.{3,}$/}
              isError={firstError}
              isDisabled={false}
              value={firstName}
              setError={setFirstError}
              setValue={setFirstName}
            />
          </div>

          <div>
            <UserInput
              placeholder={lastName}
              type="text"
              label="Last Name"
              lableColor="bg-[#27355e] sm:bg-[#293667] md:bg-[#283765] lg:bg-[#283765] xl:bg-[#283765] 2xl:bg-[#283765] 3xl:bg-[#283765]"
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
        <div className=" w-full h-[21%] flex items-center justify-center ">
          <div>
            <UserInput
              placeholder={username}
              type="text"
              label="Username"
              lableColor=" bg-[#27355f] sm:bg-[#26345d] md:bg-[#283662] lg:bg-[#283662] xl:bg-[#283662] 2xl:bg-[#283662] 3xl:bg-[#283662]"
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
        <div className=" w-full h-[21%] flex items-center justify-center ">
          <div>
            <UserInput
              placeholder={email}
              type="email"
              label="Email"
              lableColor="bg-[#27345f] sm:bg-[#273461] md:bg-[#293867] lg:bg-[#293867] xl:bg-[#293867] 2xl:bg-[#293867] 3xl:bg-[#293867]"
              width="2xl"
              regExp={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              isError={emailError}
              isDisabled={true}
              value={email}
              setError={setEmailError}
              setValue={setEmail}
            />
          </div>
        </div>
        <div className="w-[13rem]  h-[21%]  sm:w-[22rem]   md:w-[530px] lg:w-[26rem] xl:w-[31rem] 2xl:w-[35rem] 3xl:w-[52rem]  flex flex-row justify-end items-center   gap-4 md:gap-4">
          <div className="w-auto sm:w-auto  ">
            <SecondaryButton text="Discard" onClick={handleCancle} />
          </div>
          <div className="w-auto sm:w-auto ">
            <PrimaryButton text="Save" onClick={handleConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationsSetting;
