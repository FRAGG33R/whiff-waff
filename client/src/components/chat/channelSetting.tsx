import React, { useState } from "react";
import Image from "next/image";
import EXPLORE from "../../../public/EXPLORE.svg";
import Setting from "../../../public/settings.svg";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ModelChannel from "./modelChannel";
import UserInput from "../ui/inputs/settingsInputs";
import { KeyboardEvent } from "react";
import PrimaryButton from "../ui/buttons/primaryButton";
import ModelSettings from "./modelSettings";

const ChannelSettings = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
    }
  };
  const handleOpen = () => setOpen(!open);
  const handleSave = () => {};
  const dummyArray1 = [
    {
      membre : false,
      admin : true,
      userName: "machlouj",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
    {
      membre : true,
      admin : false,
      userName: "kamal",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
    {
      membre : true,
      admin : false,
      userName: "ayoub",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
    {
      membre : true,
      admin : false,
      userName: "yakoub",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
    {
      membre : true,
      admin : false,
      userName: "houssam",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
  ];
  return (
    <div className="w-full flex flex-row  gap-2 ">
      <button
        onClick={handleOpen}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={EXPLORE}
          alt="information icon"
          className="w-[90%] 2xl:w-[23%] h-full "
        />
        <div className=" 2xl:w-[80%] 2xl:flex items-center justify-start font-teko font-semibold  hidden xl:text-4xl text-[#6C7FA7] text-opacity-50">
          {" "}
          Explore channels
        </div>
      </button>
      <Dialog
        className="bg-[#6C7FA7]  h-[800px] w-[200px] rounded-[20px]"
        open={open}
        handler={handleOpen}
        size="xs"
      >
        <DialogHeader className="text-Mercury font-teko flex items-start justify-start">
          <Image
            src={Setting}
            alt="information icon"
            className="w-[8%] h-[8%] "
          />
          
        </DialogHeader>
        <DialogBody className="h-[680px] flex flex-col justify-center items-center gap-3">
          <div className="w-full h-[180px] flex flex-col justify-center items-center  gap-4 ">
          <div className="">
            <UserInput
              handleKeyDown={handleKeyDown}
              placeholder="*********"
              type="password"
              label="Password"
              lableColor="bg-[#6d7fa7]"
              width="xl"
              regExp={/^.{6,}$/}
              isError={errorPassword}
              isDisabled={false}
              value={password} 
              setError={setErrorPassword}
              setValue={setPassword}
            />
          </div>
          <PrimaryButton text="Save" onClick={handleSave} />
          </div>
          <div className="w-full h-[500px] bg-[#FFFFFF] bg-opacity-10 rounded-[12px] flex items-center justify-center">
            <div className="w-full h-[400px]  px-2 lg:px-4 space-y-6 overflow-y-auto scrollbar  scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
                {dummyArray1.map((item, index) => (
                <ModelSettings
                    key={index}
                    userName={item.userName}
                    avatar={item.avatars}
                    admin={item.admin}
                    member={item.membre}
                />
                ))}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default ChannelSettings;
