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
import { textLimit } from "@/lib/textLimit";

export default function ChannelBar(props: channelBarType) {
  const [channel, setChannel] = useRecoilState(channelAtom);
  const [openSettings, setOpenSettings] = useState(false);
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
      setChannel((prev: channelType[]) => {
        const updatedChannels = prev.filter(
          (item: channelType) =>
            item.roomChat.id !== props.selectedChannel.roomChat.id
        );
        props.setSelectedChannel(updatedChannels[0]);
        return updatedChannels;
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
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
    setOpenSettings(!openSettings);
  };

  const handleLeaveChannel = async () => {
    const token = localStorage.getItem("token");
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
      setDisplaySettings(false);
      res.data.map((item: channelUsersType) => {
        if (item && (item.user.userName === (loggedUser as loggedUserType).userName)) {
          if (item.status === "OWNER" || item.status === "ADMIN")
            setDisplaySettings(true);
        }
      });
      setChannelUsers(res.data.map((item: channelUsersType) => {
		if (item !== null && item !== undefined)
		  return item;
	  }));
    } catch (error: any) {
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else getUsers(token);
  }, [props.selectedChannel, openSettings]);

  return (
    <div className="w-full h-full flex items-center justify-center px-2 md:px-6 py-2 md:py-2">
      <Toaster position="top-right" />
      <div className="h-full w-full flex flex-row items-center justify-between">
        <div className="h-full min-w-1 flex flex-row items-center justify-center  xl:gap-6">
          <div
            className="w-12 md:w-16 h-[90%] rounded-[12px]"
          >
            <RenderAvatars avatars={props.avatars} />
          </div>
          <div className="min-w-1 h-full hidden md:flex flex-col md:gap-2 items-start justify-center ">
            <div className="font-teko text-2xl xl:text-3xl font-meduim tracking-wider">
              {textLimit(props.channelName, 30)}
            </div>
          </div>
        </div>
        <div className="h-full min-w-1 flex flex-row gap-2 md:gap-4 ite
		ms-center justify-center">
          {displaySettings === true && (
            <>
              <ChannelSettings
			    open={openSettings}
				setOpen={handleOpenSettings}
                selectedChannel={props.selectedChannel}
                channelUsers={channelUsers}
				setChannelUsers={setChannelUsers}
              />
			<InviteUser selectedChannel={props.selectedChannel} />
            </>
          )}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDeleteChannel}
            className="w-10 xl:w-14 h-10 xl:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
          >
            <IconTrash className="w-5 xl:w-8 h-5 xl:h-8" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLeaveChannel}
            className="w-10 xl:w-14 h-10 xl:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
          >
            <IconDoorExit className="w-5 xl:w-8 h-5 xl:h-8" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
