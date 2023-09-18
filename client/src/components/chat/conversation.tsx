import { loggedUserAtom, userAtom } from "@/context/RecoilAtoms";
import { conversationType, messageType } from "@/types/chatType";
import { userType } from "@/types/userType";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

export default function Conversation(props  : {conversation : conversationType}) {
  const conversationRef = useRef(null);
  const [user, setUser] = useRecoilState(userAtom);
  const getTime = (fullDate : string) => {
	const date = new Date(fullDate);
	const hour = date.getHours();
	const minute = date.getMinutes();

	return (`${hour} : ${minute}`)
  }

  useEffect(() => {
    const conversationDiv : any = conversationRef.current;
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, [props.conversation.messages.length]);
  console.log('Conversation : ', user);
  
  return (
    <div ref={conversationRef} className="w-full h-full overflow-y-scroll scrollbar scrollbar-track-rounded-full scrollbar-thumb-GreenishYellow scrollbar-track-transparent ">
      {props.conversation.messages.map((item : messageType, index : number) => {
        return (
          <div key={index} className={`chat ${item.type === "sender" ? 'chat-end text-white' : "chat-start text-black"} `}>
            <div className={`${item.type === 'sender' ? "bg-HokiCl" : "bg-GreenishYellow"} px-1 md:px-4 w-[150px] md:w-[350px] xl:w-[400px] 2xl:w-[600px] rounded-[12px] py-1 md:py-2 flex flex-col md:space-y-6 items-center justify-center`}>
              <div className="w-full flex flex-row items-center justify-between font-normal font-teko text-md md:text-2xl">
                <div>{item.type === "receiver" ? props.conversation.receiver.userName : (user as userType).userName}</div>
                <div>{getTime(item.date)}</div>
              </div>
              <div className="font-poppins w-full break-all text-sm md:text-lg">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
