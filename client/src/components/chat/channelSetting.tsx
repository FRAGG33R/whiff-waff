import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import UserInput from "../ui/inputs/settingsInputs";
import { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { IconSettings } from "@tabler/icons-react";
import { channelType } from "@/types/chatType";
import Setting from "../../../public/settings.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import ModelSettings from "./modelSettings";
import Image from "next/image";
import { api } from "../axios/instance";
import toast, { Toaster } from "react-hot-toast";

const ChannelSettings = (props: { selectedChannel: channelType }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleOpen = () => setOpen(!open);
  const handleSave = async () => {
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters", {
        style: {
          borderRadius: "12px",
          padding: "12px",
          background: "#6C7FA7",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "18px",
        },
      });
    }
    const req = {
      channelName: props.selectedChannel.roomChat.name,
      channelPassword: password,
      channelId: props.selectedChannel.roomChat.id,
    };
    try {
      const res = await api.patch("/chat/room/update", req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message, {
        style: {
          borderRadius: "12px",
          padding: "12px",
          background: "#6C7FA7",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "18px",
        },
      });
    }
  };

  const dummyArray1 = [
    {
      membre: false,
      admin: true,
      userName: "machlouj",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
    {
      membre: true,
      admin: false,
      userName: "kamal",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
    {
      membre: true,
      admin: false,
      userName: "ayoub",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
    {
      membre: true,
      admin: false,
      userName: "yakoub",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
    {
      membre: true,
      admin: false,
      userName: "houssam",
      avatars:
        "https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638",
    },
  ];

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
        className="w-10 md:w-14 h-10 md:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
      >
        <IconSettings className="w-6 md:w-8 h-6 md:h-8" />
      </motion.div>
      <Dialog
        className="bg-RhinoBlue h-[800px] w-[200px] rounded-[20px]"
        open={open}
        handler={handleOpen}
        size="xs"
      >
        <Toaster position="top-right" />
        <DialogHeader className="text-Mercury font-teko flex items-start justify-start">
          <Image
            src={Setting}
            alt="information icon"
            className="w-[8%] h-[8%]"
          />
        </DialogHeader>
        <DialogBody className="h-[680px] flex flex-col justify-center items-center gap-3">
          <div className="w-full h-[180px] flex flex-col justify-center items-center gap-4">
            <div>
              <UserInput
                handleKeyDown={handleKeyDown}
                placeholder="*********"
                type="password"
                label="Password"
                lableColor="bg-RhinoBlue"
                width="xl"
                regExp={/^.{4,}$/}
                isError={errorPassword}
                isDisabled={false}
                value={password}
                setError={setErrorPassword}
                setValue={setPassword}
              />
            </div>
            <PrimaryButton text="Save" onClick={handleSave} />
          </div>
          <div className="w-full h-[500px] rounded-[12px] flex items-center justify-center">
            <div className="w-full h-[400px] px-2 lg:px-4 space-y-6 overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
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
