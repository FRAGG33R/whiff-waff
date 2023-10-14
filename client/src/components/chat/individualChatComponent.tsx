import { conversationType } from "@/types/chatType";
import SingleConversationHistory from "./singleConversationHistory";
import { IconMessagesOff } from "@tabler/icons-react";
import { useRecoilState } from "recoil";
import { chatAtom } from "@/context/RecoilAtoms";
import { individualChatComponentType } from "@/types/chatType";

export default function IndividualChatComponent(props : individualChatComponentType) {
  const [chat] = useRecoilState(chatAtom);

  return (
    <div className="w-full h-full px- lg:px-4 space-y-6 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
      {(chat as conversationType[]).length > 0 ? (
        <>
          {props.conversations.map((item: conversationType, index: number) => (
            <SingleConversationHistory
              key={index}
              userName={item.receiver.userName}
              lastMessage={item.messages[item.messages.length - 1]?.content}
              avatar={item.receiver.avatar}
              selected={
                props.selectedConversation?.receiver.userName ===
                item.receiver.userName
              }
              messagePrefix={
                item.messages[item.messages.length - 1]?.type === "sender"
              }
              onClick={() => props.handleSelectedConversation(item)}
            />
          ))}
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-start space-y-2 py-12 font-poppins font-medium text-sm 2xl:text-xl">
          <IconMessagesOff stroke={2} className="h-4 w-4 md:h-8 md:w-8" />
          <div className="text-center text-[7px] md:text-xl">No conversations</div>
        </div>
      )}
    </div>
  );
}
