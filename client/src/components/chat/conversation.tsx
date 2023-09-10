import { useEffect, useRef } from "react";
import { conversation } from "@/types/dummy";

export default function Conversation() {
  const conversationRef = useRef(null);

  useEffect(() => {
    const conversationDiv : any = conversationRef.current;
    if (conversationDiv) {
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }, []);

  return (
    <div ref={conversationRef} className="w-full h-full overflow-y-scroll scrollbar scrollbar-track-rounded-full scrollbar-thumb-GreenishYellow  scrollbar-track-transparent ">
      {conversation.map((item, index) => {
        return (
          <div key={index} className={`chat ${item.type === "receiver" ? 'chat-end text-white' : "chat-start text-black"} `}>
            <div className={`${item.type === 'receiver' ? "bg-HokiCl" : "bg-GreenishYellow"} px-1 md:px-4 w-[150px] md:w-[350px] xl:w-[400px] 2xl:w-[600px] rounded-[12px] py-1 md:py-2 flex flex-col md:space-y-6 items-center justify-center`}>
              <div className="w-full flex flex-row items-center justify-between font-normal font-teko text-md md:text-2xl">
                <div>{item.userName}</div>
                <div>{item.time}</div>
              </div>
              <div className="font-poppins w-full text-sm md:text-lg">
                It's over Anakin, I have the high ground. 
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
