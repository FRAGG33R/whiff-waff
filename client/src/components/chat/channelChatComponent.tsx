import { Fragment } from "react";
import CreateChannel from "./createChannel";
import ExploreChannels from "./exploreChannels";
import { channelType } from "@/types/chatType";
import SingleChannelConversationHistory from "./channelsConversation";
import { IconMessagesOff } from "@tabler/icons-react";

export default function ChannelChatComponent(props: {
  channels: channelType[];
  handleSelectedChannel : Function
  selectedChannel : channelType
  setSelectedChannel : Function
}) {

  return (
    <div className="w-full h-full px-2 lg:px-4 space-y-2 xl:space-y-6 overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
      <div className="w-full md:px-4 h-16 md:h-[5rem] xl:h-[6.4rem] flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]">
        <CreateChannel selectedChannel={props.selectedChannel} setSelectedChannel={props.setSelectedChannel} />
      </div>
      <div className="w-full md:px-4 h-16 md:h-[5rem] xl:h-[6.4rem] flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]">
        <ExploreChannels selectedChannel={props.selectedChannel} setSelectedChannel={props.setSelectedChannel}/>
      </div>
     {props.channels.length > 0 && props.selectedChannel ? <>
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
      </> :
		<div className="w-full min-h-1 flex flex-col items-center justify-start space-y-2 py-12 font-poppins font-medium text-sm 2xl:text-xl">
			  <IconMessagesOff stroke={2} className="h-4 w-4 md:h-8 md:w-8" />
		<div className="text-center">No channels</div>
		</div>}
    </div>
  );
}
