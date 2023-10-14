import { loggedUserAtom } from "@/context/RecoilAtoms";
import { channelMessageType, channelType  } from "@/types/chatType";
import { loggedUserType } from "@/types/userType";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { IconExclamationCircle } from '@tabler/icons-react';

export default function ChannelConversation(props  : {conversation : channelType}) 
{
  const conversationRef = useRef(null);
  const [loggedUser] = useRecoilState(loggedUserAtom);

  const getTime = (fullDate : string) => {
	const date = new Date(Number(fullDate));
	return `${date.getHours()} : ${date.getMinutes()}`
  }

  useEffect(() => {
    const conversationDiv : any = conversationRef.current;
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [props.conversation.message.length]);
  
  return (
    <div ref={conversationRef} className="w-full h-full overflow-y-scroll scrollbar scrollbar-track-rounded-full scroll-smooth scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
      {props.conversation.message.map((item : channelMessageType, index : number) => {
        return (
          <div key={index} className={`chat ${item.message.type === "sender" ? 'chat-end text-white' : "chat-start text-black"} `}>
            <div className={`${item.message.type === 'sender' ? "bg-HokiCl" : "bg-GreenishYellow"} px-1 md:px-4 w-[150px] md:w-[350px] xl:w-[400px] 2xl:w-[600px] rounded-[12px] py-1 md:py-2 flex flex-col md:space-y-6 items-center justify-center`}>
              <div className="w-full flex flex-row items-center justify-between font-normal font-teko text-md md:text-2xl">
                <div>{item.message.type === "receiver" ? item.user.userName : (loggedUser as loggedUserType).userName}</div>
                <div>{getTime(item.message.date)}</div>
              </div>
              <div className="font-poppins  w-full  overflow-clip text-sm md:text-lg flex items-cente justify-between">
                {item.message.content}
				{item.isError && <IconExclamationCircle color="#FF0000" />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
