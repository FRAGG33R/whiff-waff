import React, { useEffect } from "react";
import Image from "next/image";
import InformationIcons from "../../../public/informationIcons.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import UserInput from "../ui/inputs/settingsInputs";
import { useState } from "react";
import { KeyboardEvent } from "react";
import SettingsHexaGon from "./settingsHexagon";
import { useRecoilState } from "recoil";
import { userType } from "./../../types/userType";
import { userAtom } from "@/context/RecoilAtoms";
import ValidationAlert from "../ui/alerts/validationAlert";
import { api, localApi } from "../axios/instance";
import { useRouter } from "next/router";

const InformationsSetting = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastNam] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstError, setFirstError] = useState(false);
  const [lastError, setLastError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [avatarImage, setAvatarImage] = useState<File | string>("");
  const [userData, setUserData] = useState<any>(null);
  const [user, setUser] = useRecoilState(userAtom);
  const [userState, setUserState] = useState<userType>(user as userType);

  const router = useRouter();
  useEffect(() => {
	
    setUserState(user as userType);
    setAvatarImage(userState.avatar);
    setFirstName(userState.firstName);
    setLastNam(userState.lastName);
    setUserName(userState.userName);
    setEmail(userState.email);
    setUserData(userState);
  }, []);

  let jwtToken: string | null = null;

  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("token");
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };
  const handleCancle = () => {
    setFirstName("");
    setLastNam("");
    setUserName("");
  };

  const inputFields = [
    {
      id: "firstName",
      placeholder: "First Name",
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
      errorMessage: "Invalid First Name",
    },
    {
      id: "lastName",
      placeholder: "Last Name",
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
      errorMessage: "Invalid Last Name",
    },
  ];

  const handleConfirm = async () => {
    if (!firstName.match(/^.{3,}$/)) {
      setFirstError(true);
      return;
    }

    if (!lastName.match(/^.{3,}$/)) {
      setLastError(true);
      return;
    }

    if (!userName.match(/^[a-zA-Z0-9_.]{3,16}$/)) {
      setUserError(true);
      return;
    }

    const formData = new FormData();

    if (firstName !== userData.firstName) {
      formData.append("firstName", firstName);
    }

    if (lastName !== userData.lastName) {
      formData.append("lastName", lastName);
    }

    if (userName !== userData.userName) {
      formData.append("userName", userName);
    }

    if (avatarImage) {
      if (avatarImage !== userData.avatar) {
        formData.append("avatar", avatarImage);
      }
    }
    try {
      const req = await api.patch(
        "/auth/settings/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const newToken = req.data.token.token;
      localStorage.setItem("token", newToken);
      const r = await localApi.post("/saveToken", {  token: newToken});
    } catch (error) {
    }
    router.push("/profile/" + userName);
  };
  const handleImageUpload = (file: File) => {
    setAvatarImage(file);
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
      <div className="w-full h-[100px] sm:h-[130px] md:h-[160px] lg:h-[240px] xl:h-[240px] 2xl:h-[240px] flex items-center justify-center py-8 pl-2">
           <SettingsHexaGon  avatar={userState.avatar} onImageUpload={handleImageUpload} />
      </div>
      <div className="w-full h-full flex items-center justify-center flex-col gap-2 md:gap-6 ">
        <div className="w-full h-[14%] md:h-[17%] flex flex-row items-center justify-center gap-5 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14">
          {inputFields.map((input) => (
            <div key={input.id}>
              <UserInput handleKeyDown={handleKeyDown} {...input} />
              {input.isError && (
                <p className="text-md text-red-500 flex items-center justify-center font-poppins ">
                  {input.errorMessage}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className=" w-full h-[17%] flex items-center justify-center ">
          <div>
            <UserInput
              handleKeyDown={handleKeyDown}
              placeholder="Username"
              type="text"
              label="Username"
              lableColor=" bg-[#27355f] sm:bg-[#26345d] md:bg-[#283662] lg:bg-[#283662] xl:bg-[#283662] 2xl:bg-[#283662] 3xl:bg-[#283662]"
              width="2xl"
              regExp={/^[a-zA-Z0-9_.]{3,16}$/}
              isError={userError}
              isDisabled={false}
              value={userName}
              setError={setUserError}
              setValue={setUserName}
            />
            {userError === true && (
              <p className="text-md  text-red-500   flex items-center justify-center  font-poppins ">
                Invalide username
              </p>
            )}
          </div>
        </div>
        <div className=" w-full h-[14%] md:h-[17%] flex items-center justify-center ">
          <div>
            <UserInput
              handleKeyDown={handleKeyDown}
              placeholder="email@gmail.com"
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
        <div className="w-[13rem]  h-[18%]  sm:w-[22rem]   md:w-[22rem] lg:w-[31rem] xl:w-[31rem] 2xl:w-[35rem] 3xl:w-[54rem]  flex flex-row justify-end items-center   gap-4 md:gap-4">
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
