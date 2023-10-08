import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import UserInput from "../ui/inputs/settingsInputs";
import { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { IconSettings } from "@tabler/icons-react";
import { channelType, channelUsersType } from "@/types/chatType";
import Setting from "../../../public/settings.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import ModelSettings from "./modelSettings";
import Image from "next/image";
import { api } from "../axios/instance";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const ChannelSettings = (props: { selectedChannel: channelType, channelUsers : channelUsersType[] }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const router = useRouter();

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

//   const getUsers = async (token: string) => {
//     try {
//       const res = await api.get(`/chat/usersOfRoom/${props.selectedChannel.roomChat.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(res.data);
// 	  setChannelUsers(res.data);
//     } catch (error: any) {
//       console.log(error.response.data);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) router.push("/login");
//     else getUsers(token);
//   }, []);

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
              {props.channelUsers.map((item : channelUsersType, index : number) => (
                <ModelSettings
                  key={index}
                  userName={item.user.userName}
			avatar={item.user.avatar}
				  type={item.status}
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
