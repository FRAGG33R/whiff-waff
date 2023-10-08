import React from "react";
import { motion } from "framer-motion";
import { ModelChannelsType } from "@/types/channelsConversation";
import { RenderAvatars } from "./renderAvatars";
import { IconLock } from '@tabler/icons-react';
const ModelChannel = (props: ModelChannelsType) => {
  const { avatars } = props;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
	  onClick={props.handleJoinChannel}
      className="h-16 cursor-pointer md:h-[5rem] xl:h-[6.4rem] w-full bg-HokiCl bg-opacity-30 rounded-[12px] md:rounded-[20px] flex items-center justify-between flex-row md:space-x-2 2xl:space-x-4 px-2"
    >
      <div className="min-w-1 flex flex-row items-center space-x-2">
        <div className="w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 flex rounded-[12px] 2xl:rounded-[20px] ">
          <RenderAvatars avatars={avatars} />
        </div>
        <div className="min-w-1 lg:text-xl 2xl:text-3xl text-Mercury tracking-wider font-teko ">
          {props.channelName}
        </div>
		{props.channelType === "PROTECTED" && (
			<div className="text-GreenishYellow">
				<IconLock className="w-4 lg:w-6 lg:h-6 h-4"/>
			</div>
		)}
      </div>
        <div className="min-w-1 font-poppins font-light text-GreenishYellow text-[9px] md:text-sm 3xl:text-md">
          <div className="flex items-end justify-end">{props.channelType}</div>
        </div>
    </motion.div>
  );
};

export default ModelChannel;
