import { SingleMembreType } from "@/types/singleConversationHistory";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import MuteDropDown from "../ui/dropDowns/muteDropDown";
import UserChannelDropDown from "../ui/dropDowns/userChannelDropDown";
import { useRecoilState } from "recoil";
import { loggedUserAtom } from "@/context/RecoilAtoms";
import { loggedUserType } from "@/types/userType";

const ModelSettings = (props: SingleMembreType) => {
  const router = useRouter();
  const [openMuteDropDown, setOpenMuteDropDown] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [muteDuration, setMuteDuration] = useState<number>(0);

  const handleMute = async () => {
    setOpenMuteDropDown(!openMuteDropDown);
  };

  return (
    <div
      onClick={() => {}}
      className={`h-12 md:h-[4.7rem] xl:h-[5.3rem] 3xl:h-[6.4rem] w-full cursor-pointer bg-HokiCl bg-opacity-30 hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px] flex items-center justify-start flex-row space-x-2 2xl:space-x-4 px-2`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-8 w-8 md:h-12 md:w-12 lg:w-14 lg:h-14 2xl:w-20 2xl:h-16 3xl:w-24 3xl:h-20 bg-HokiCl rounded-[6px] md:rounded-[12px] 2xl:rounded-[15px]"
      >
        <img
          alt="user avatar"
          className="w-full h-full rounded-[6px] md:rounded-[12px] 2xl:rounded-[15px]"
          src={props.avatar}
          onClick={() => router.push(`/profile/${props.userName}`)}
        />
      </motion.div>
      <div className="w-full h-full flex flex-row items-center justify-between ">
        <div className="flex flex-col items-start -space-y-1 min-w-1">
          <div className="lg:text-xl 2xl:text-3xl tracking-wider font-teko text-Mercury">
            {props.userName}
          </div>
          <div className="font-light font-teko text-white/60 2xl:text-md 3xl:text-xl lowercase">
            {props.type === "DEFLAULT" || props.type === "MUTED"
              ? ""
              : props.type}
          </div>
        </div>
        {(props.type == "DEFLAULT" || props.type == "MUTED" || (props.type == "ADMIN" && props.userName != (loggedUser as loggedUserType).userName)) && (
          <div className="min-w-1 h-full flex flex-row items-center justify-center gap-2">
            <MuteDropDown
              setMuteDurition={setMuteDuration}
              roomId={props.selectedChannel.roomChat.id}
              userId={props.userId}
            />
            <UserChannelDropDown
              roomId={props.selectedChannel.roomChat.id}
              userId={props.userId}
              channelUsers={props.channelUsers}
              setChannelUsers={props.setChannelUsers}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSettings;
