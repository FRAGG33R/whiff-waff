
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { channelBarType } from "@/types/chatType";
import { IconSettings } from '@tabler/icons-react';
import { api } from "../axios/instance";
import { RenderAvatars } from "./renderAvatars";

export default function ChannelBar(props: channelBarType) {
  const router = useRouter();

  const handleDeleteChannel = async () => {
	try {
		const res = await api.post(`/chat/room/delete/`, {
			channelId : props.channelId
		},{
			headers : {
				Authorization : `Bearer ${localStorage.getItem("token")}`
			},
		},);
		console.log('res : ', res.data);
	} catch (error : any) {

	}
  }
  const handleOpenSettings = async () => {

  }
  return (
    <div className="w-full h-full flex items-center justify-center px-2 md:px-6 py-2 md:py-4">
      <div className="h-full w-full flex flex-row items-center justify-between">
        <div className="h-full min-w-1 flex flex-row items-center justify-center gap-2 md:gap-6">
          <div
            className="w-12 md:w-16 h-full rounded-[12px] tooltip tooltip-left"
            data-tip="fragger"
          >
			<RenderAvatars avatars={props.avatars} />
            {/* <img
              src={props.avatar}
              className="w-full h-full rounded-[12px]"
              alt="user avatar"
            /> */}
          </div>
          <div className="min-w-1 h-full hidden md:flex flex-col md:gap-2 items-start justify-center ">
            <div className="font-teko text-3xl font-meduim tracking-wider">
              {props.channelName}
            </div>
          </div>
        </div>
        <div className="h-full min-w-1 flex flex-row gap-4 items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpenSettings}
            className="w-10 md:w-14 h-10 md:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
          >
            <IconSettings className="w-6 md:w-8 h-6 md:h-8" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDeleteChannel}
            className="w-10 md:w-14 h-10 md:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
          >
            <IconTrash className="w-6 md:w-8 h-6 md:h-8" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
