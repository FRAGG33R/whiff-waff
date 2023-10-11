import { textLimit } from "@/lib/textLimit";
import { SingleConversationHistoryType } from "@/types/singleConversationHistory";
import { motion } from "framer-motion";

export default function SingleConversationHistory(
  props: SingleConversationHistoryType
) {

  return (
    <motion.div 
		onClick={props.onClick}
		whileTap={{scale : 0.97}}
		whileHover={{scale : 1.03}}
		className={`h-12 md:h-[4.7rem] xl:h-[5.3rem] 3xl:h-[6.4rem] w-full cursor-pointer ${props.selected === true ? "bg-[#6C7FA7]/[12%]" : "bg-transparent"}  hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px] flex items-center justify-center md:justify-start flex-row md:space-x-2 2xl:space-x-4 px-2`}>
      <div className="h-8 w-8 md:h-12 md:w-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 bg-HokiCl rounded-[6px] md:rounded-[12px] 2xl:rounded-[20px] tooltip" data-tip={props.userName}>
		<img alt="" className="w-full h-full rounded-[6px] md:rounded-[12px] 2xl:rounded-[20px]" src={props.avatar} />
	  </div>
      <div className="flex flex-col space-y-[3px] xl:w-32 2xl:w-52 3xl:w-60">
        <div className=" lg:text-xl 2xl:text-3xl tracking-wider font-teko hidden md:block">
          {textLimit(props.userName, 11)}
        </div>
        <div className="font-poppins font-light text-HokiCl md:text-[1vw] xl:text-sm 3xl:text-lg hidden md:block">
          {props.lastMessage !== undefined ? ((props.messagePrefix ? "You : " : "") + (props.lastMessage.length > 15 ? props.lastMessage.substring(0, 15) : props.lastMessage)): ""}
        </div>
      </div>
    </motion.div>
  );
}
