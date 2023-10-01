import { Fragment } from "react";
import CreateChannel from "./createChannel";
import ExploreChannels from "./exploreChannels";
import { channelType } from "@/types/chatType";
import SingleChannelConversationHistory from "./channelsConversation";

export default function ChannelChatComponent(props: {
  channels: channelType[];
  handleSelectedChannel : Function
  selectedChannel : channelType
}) {


  return (
    <div className="w-full h-full px-2 lg:px-4 space-y-2 xl:space-y-6 overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
      <div className="w-full md:px-4 h-16 md:h-[5rem] xl:h-[6.4rem] flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]">
        <CreateChannel />
      </div>
      <div className="w-full md:px-4 h-16 md:h-[5rem] xl:h-[6.4rem] flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]">
        <ExploreChannels />
      </div>
      <>
        {props.channels.length > 0 &&
          props.channels.map((item: channelType, index: number) => {
            return (
              <Fragment key={index}>
                <SingleChannelConversationHistory
				  selected={item.roomChat.id === props.selectedChannel.roomChat.id}
                  key={index}
                  lastUser={item.message[item.message.length - 1]?.roomSender.user.userName}
                  channelName={item.roomChat.name}
                  lastMessage={item.message[item.message.length - 1]?.message}
                  avatars={item.avatars}
				  onClick={() => props.handleSelectedChannel(item)}
                />
              </Fragment>
            );
          })}
      </>
    </div>
  );
}
