import { ChannelsConversationHistoryType } from "@/types/channelsConversation";
import { RenderAvatars } from "./renderAvatars";

export default function SingleChannelConversationHistory(
  props: ChannelsConversationHistoryType
) {
  const { avatars } = props;

  return (
    <div
	  onClick={props.onClick}
      className="h-16 md:h-[5rem] xl:h-[6.4rem] w-full cursor-pointer hover:bg-HokiCl/[12%] rounded-[12px] md:rounded-[20px] flex items-center justify-center flex-row md:space-x-2 2xl:space-x-4 px-2"
    >
      <div className="w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 flex rounded-[12px] 2xl:rounded-[20px]">
		<RenderAvatars avatars={avatars} />
      </div>
      <div className="flex flex-col space-y-[3px] xl:w-32 2xl:w-60">
        <div className="lg:text-xl 2xl:text-3xl tracking-wider font-teko hidden md:block">
          {props.channelName}
        </div>
        <div className="font-poppins min-h-[20px] font-light text-HokiCl 2xl:text-sm 3xl:text-lg hidden xl:block">
		  {props.lastMessage ? `${props.lastUser}: ${props.lastMessage}` : ""}
        </div>
      </div>
    </div>
  );
}
