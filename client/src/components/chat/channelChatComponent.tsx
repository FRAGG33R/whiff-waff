import CreateChannel from "./createChannel";
import ExploreChannels from "./exploreChannels";
import ChannelsConversation from "./channelsConversation";
import { channelDummy } from "@/types/dummy";

export default function ChannelChatComponent() {
  return (
    <div className="w-full h-full px-2 lg:px-4 space-y-2 xl:space-y-6 overflow-y-auto scrollbar scrollbar-thumb-GreenishYellow scrollbar-track-transparent">
      <div className="w-full md:px-4 h-16 md:h-[5rem] xl:h-[6.4rem] flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]">
        <CreateChannel />
      </div>
      <div className="w-full md:px-4 h-16 md:h-[5rem] xl:h-[6.4rem] flex flex-row cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px]">
        <ExploreChannels />
      </div>
      {channelDummy.map((item, index: number) => (
        <ChannelsConversation
          key={index}
          lastUser={item.userName}
          channelName={item.channelName}
          lastMessage={item.lastMessage}
          avatars={item.avatars || []}
        />
      ))}
    </div>
  );
}