import { SingleMembreType } from "@/types/singleConversationHistory";
import React from "react";
import { motion } from "framer-motion";
import Silence from "../../../public/silence.svg";
import SettingDrop from "../../../public/settingDrop.svg";
import Image from "next/image";
const ModelSettings = (props: SingleMembreType) => {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      className={`h-16 md:h-[5rem] xl:h-[6.4rem] w-full bg-[#351F60] bg-opacity-30   rounded-[12px] md:rounded-[20px] flex items-center justify-start flex-row md:space-x-2 2xl:space-x-4 px-8`}
    >
      <div className="h-10 w-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 bg-GreenishYellow rounded-[12px] 2xl:rounded-[20px] ">
        <img
          alt="user avatar"
          className="w-full h-full rounded-[12px] 2xl:rounded-[20px]"
          src={props.avatar}
        />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col space-y-[3px] xl:w-32 2xl:w-60 ">
          <div className=" lg:text-xl 2xl:text-3xl tracking-wider font-teko  text-Mercury hidden md:block">
            {props.userName}
          </div>
          <div className=" font-light font-teko text-[#ffffff] 2xl:text-sm 3xl:text-lg hidden xl:block">
            {props.admin ? "Admin" : ""}
          </div>
        </div>
        <div className="w-[30%] flex flex-row items-center justify-center  gap-2 ">
          {props.member ? (
            <>
              <Image
                src={Silence}
                alt="information icon"
                className="w-[80%] h-full "
              />
              <Image
                src={SettingDrop}
                alt="information icon"
                className="w-[20%] h-full "
              />
            </>
          ) : <div className=""></div>}
        </div>
      </div>
    </motion.div>
  );
};

export default ModelSettings;
