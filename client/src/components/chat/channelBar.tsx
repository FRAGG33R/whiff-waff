import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { channelBarType, channelType } from "@/types/chatType";
import { IconDoorExit } from "@tabler/icons-react";
import { api } from "../axios/instance";
import { RenderAvatars } from "./renderAvatars";
import { useRecoilState } from "recoil";
import { channelAtom } from "@/context/RecoilAtoms";
import { useState, useEffect } from "react";
import ChannelSettings from "./channelSetting";
import { channelUsersType } from "@/types/chatType";
import { loggedUserAtom } from "@/context/RecoilAtoms";
import { loggedUserType } from "@/types/userType";
import InviteUser from "./inviteUser";
import toast, { Toaster } from "react-hot-toast";

export default function ChannelBar(props: channelBarType) {
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [opneSettings, setOpenSettings] = useState(false);
  const [channelUsers, setChannelUsers] = useState<channelUsersType[]>([]);
  const [displaySettings, setDisplaySettings] = useState<boolean>(false);
  const [loggedUser] = useRecoilState(loggedUserAtom);
  const router = useRouter();

  const handleDeleteChannel = async () => {
    try {
      const res = await api.post(
        `/chat/room/delete/`,
        {
          channelId: props.channelId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("res : ", res.data);
      setChannel((prev: channelType[]) => {
        const updatedChannels = prev.filter(
          (item: channelType) =>
            item.roomChat.id !== props.selectedChannel.roomChat.id
        );
        props.setSelectedChannel(updatedChannels[0]);
        return updatedChannels;
      });
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data, {
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

  const handleOpenSettings = async () => {
    setOpenSettings(!opneSettings);
  };

  const handleLeaveChannel = async () => {
    const token = localStorage.getItem("token");
    console.log("toke :", token);
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const res = await api.post(
        `chat/room/leave/`,
        { channelId: props.selectedChannel.roomChat.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChannel((prev: channelType[]) => {
        const updatedChannels = prev.filter(
          (item: channelType) =>
            item.roomChat.id !== props.selectedChannel.roomChat.id
        );
        props.setSelectedChannel(updatedChannels[0]);
        return updatedChannels;
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const getUsers = async (token: string) => {
    try {
      const res = await api.get(
        `/chat/usersOfRoom/${props.selectedChannel.roomChat.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setDisplaySettings(false);
      res.data.map((item: channelUsersType) => {
        if (item.user.userName === (loggedUser as loggedUserType).userName) {
          if (item.status === "OWNER" || item.status === "ADMIN")
            setDisplaySettings(true);
        }
      });
      setChannelUsers(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else getUsers(token);
  }, [props.selectedChannel]);

  return (
    <div className="w-full h-full flex items-center justify-center px-2 md:px-6 py-2 md:py-2">
      <Toaster position="top-right" />
      <div className="h-full w-full flex flex-row items-center justify-between">
        <div className="h-full min-w-1 flex flex-row items-center justify-center gap-2 md:gap-6">
          <div
            className="w-12 md:w-16 h-[90%] rounded-[12px] tooltip tooltip-left"
            data-tip="fragger"
          >
            <RenderAvatars avatars={props.avatars} />
          </div>
          <div className="min-w-1 h-full hidden md:flex flex-col md:gap-2 items-start justify-center ">
            <div className="font-teko text-3xl font-meduim tracking-wider">
              {props.channelName}
            </div>
          </div>
        </div>
        <div className="h-full min-w-1 flex flex-row gap-4 items-center justify-center">
          {displaySettings === true && (
            <>
              <ChannelSettings
                selectedChannel={props.selectedChannel}
                channelUsers={channelUsers}
              />
			<InviteUser selectedChannel={props.selectedChannel} />
            </>
          )}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDeleteChannel}
            className="w-10 md:w-14 h-10 md:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
          >
            <IconTrash className="w-6 md:w-8 h-6 md:h-8" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLeaveChannel}
            className="w-10 md:w-14 h-10 md:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
          >
            <IconDoorExit className="w-6 md:w-8 h-6 md:h-8" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
