import React from 'react'
import { motion } from "framer-motion";
import { ModelChannelsType } from "@/types/channelsConversation";
import { RenderAvatars } from './renderAvatars';
const ModelChannel = (props:ModelChannelsType) => {
    const { avatars } = props;

  return (
    <motion.div
	whileHover={{ scale: 1.03 }}
	whileTap={{ scale: 0.98 }}
    className="h-16 cursor-pointer md:h-[5rem] xl:h-[6.4rem] w-full bg-HokiCl bg-opacity-30 rounded-[12px] md:rounded-[20px] flex items-center justify-between flex-row md:space-x-2 2xl:space-x-4 px-6 "
  >
    <div className="w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 flex rounded-[12px] 2xl:rounded-[20px] ">
		<RenderAvatars avatars={avatars} />
    </div>
    <div className="flex flex-row space-y-[3px] xl:w-[60%] 2xl:w-[60%]  gap-12">
      <div className=" w-[50%] lg:text-xl 2xl:text-3xl text-Mercury tracking-wider font-teko hidden md:block ">
        {props.channelName}
      </div>
      <div className="w-[50%] font-poppins font-light text-GreenishYellow 2xl:text-sm 3xl:text-lg hidden xl:block ">
        <div className='flex items-end justify-end'>
        {props.channelType}
        </div>
      </div>
    </div>
  </motion.div>
  )
}

export default ModelChannel