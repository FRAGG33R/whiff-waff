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
  const [imageURL, setImageURL] = useState(""); 
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
  const inputFields = [
    {
      id: "firstName",
      placeholder: firstName,
      type: "text",
      label: "First Name",
      lableColor:
        "bg-[#263358] sm:bg-[#263257] md:bg-[#27335d] lg:bg-[#27345d] xl:bg-[#27345d] 2xl:bg-[#27345d] 3xl:bg-[#27345d]",
      width: "sml",
      regExp: /^.{3,}$/,
      isError: firstError,
      isDisabled: false,
      value: firstName,
      setError: setFirstError,
      setValue: setFirstName,
    },
    {
      id: "lastName",
      placeholder: lastName,
      type: "text",
      label: "Last Name",
      lableColor:
        "bg-[#27355e] sm:bg-[#293667] md:bg-[#283765] lg:bg-[#283765] xl:bg-[#283765] 2xl:bg-[#283765] 3xl:bg-[#283765]",
      width: "sml",
      regExp: /^.{3,}$/,
      isError: lastError,
      isDisabled: false,
      value: lastName,
      setError: setLastError,
      setValue: setLastNam,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("token");
        const response = await axios.get(
          "http://e1r12p4.1337.ma:3000/api/v1/users/me/",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const userData = response.data;
        setFirstName(userData.firstName);
        setLastNam(userData.lastName);
        setUsername(userData.userName);
        setEmail(userData.email);
        setImageURL(userData.imageURL); 
      } catch (error) {
        console.log("error in fetch data");
      }
    };

    fetchData();
  }, []);
  const handleConfirm = async () => {
    if (!firstName.match(/^.{3,}$/)) setFirstError(true);
    if (!lastName.match(/^.{3,}$/)) setLastError(true);
    if (!username.match(/^[a-zA-Z0-9_.]{3,16}$/)) setUserError(true);
    else console.log("code is valid");
    const jwtToken = localStorage.getItem("token");
    const res = {
      firstName,
      lastName,
      userName: username,
    };
    try {
      const req = await axios.patch(
        `http://e1r12p4.1337.ma:3000/api/v1/users/settings/`,
        res,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(req);
      console.log(req.data);
    } catch (error) {
      console.log("error in patch request");
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const jwtToken = localStorage.getItem("token"); 
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await axios.post(
        "http://e1r12p4.1337.ma:3001/api/v1/",
        formData, 
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 md:gap-6  ">
      <div className="w-full h-[7%]  md:h-[12%] flex flex-row items-center space-x-2 md:space-x-4 px-3 md:px-10 md:py-2  ">
        <Image
          src={InformationIcons}
          alt="information icon"
          className="w-7 md:w-10"
        />
        <div className="font-semibold font-teko text-xl md:text-[1.9rem] 3xl:text-[2.5rem] tracking-wide text-Mercury md:pt-2">
          INFORMATIONS
        </div>
      </div>
      <div className=" w-full h-[100px] sm:h-[130px] md:h-[160px] lg:h-[240px] xl:h-[240px] 2xl:h-[240px]  flex items-center justify-center py-8 pl-2">
        <div className="relative w-1/2">
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center flex-col gap-4 md:gap-6">
        <div className="w-full h-[17%] flex flex-row items-center justify-center gap-5 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14">
          {inputFields.map((input) => (
            <div key={input.id}>
              <UserInput {...input} />
            </div>
          ))}
        </div>
         <div className=" w-full h-[17%] flex items-center justify-center ">
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
        <div className=" w-full h-[17%] flex items-center justify-center ">
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
        <div className="w-[13rem]  h-[18%]  sm:w-[22rem]   md:w-[22rem] lg:w-[26rem] xl:w-[31rem] 2xl:w-[35rem] 3xl:w-[54rem]  flex flex-row justify-end items-center   gap-4 md:gap-4">
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
