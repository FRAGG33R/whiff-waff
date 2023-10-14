import React, { Fragment, useEffect, useState } from "react";
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

const ChannelSettings = (props: {
  selectedChannel: channelType;
  channelUsers: channelUsersType[];
  open: boolean;
  setOpen: Function;
  setChannelUsers: Function;
}) => {
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleOpen = () => props.setOpen(!open);

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
    } catch (err: any) {
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

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
        className="w-10 xl:w-14 h-10 xl:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
      >
        <IconSettings className="w-5 xl:w-8 h-5 xl:h-8" />
      </motion.div>
      <Dialog
        className="bg-RhinoBlue h-[800px] w-[200px] rounded-[20px]"
        open={props.open}
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
              {props.channelUsers.map(
                (item: channelUsersType, index: number) => (
                  <Fragment key={index  + 1 }>
                    {item !== null && item !== undefined && (
                      <>
                        {item.status === "BANNED" ? (
                          <></>
                        ) : (
                          <ModelSettings
                            key={index}
                            userName={item.user.userName}
                            userId={item.user.id}
                            avatar={item.user.avatar}
                            type={item.status}
                            selectedChannel={props.selectedChannel}
                            channelUsers={props.channelUsers}
                            setChannelUsers={props.setChannelUsers}
                          />
                        )}
                      </>
                    )}
                  </Fragment>
                )
              )}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default ChannelSettings;
