import Image from "next/image";
import { achievementsAvatars } from "@/types/achievements";
import AchievementsProgressBar from "../ui/progressBar/achievementsProgressBar";
export default function SingleAchievements(props : {title : string, description : string, index : number }) {
  return (
    <div key={props.index} className="w-[95%] h-16 md:h-24 flex flex-row items-start justify-center rounded-[12px] md:rounded-[20px] bg-[#0F0F0F]/[32%]">
      <div className="min-w-1 h-full flex items-center justify-start overflow-hidden">
        <Image
          src={achievementsAvatars[props.index]}
          alt="legend achievement avatar"
          className=" w-56 h-80 pt-5 -ml-4"
        />
      </div>
      <div className="w-full min-h-1 flex flex-col items-start justify-start md:space-y-2 font-teko text-Mercury uppercase -ml-6 md:pt-4">
        <div className="w-full min-h-1 flex flex-col">
          <div className="text-xl md:text-[1.7rem] font-medium max-h-6 flex items-center tracking-wide">{props.title}</div>
          <div className="text-[0.7rem] md:text-[1.1rem] font-thin max-h-5 tracking-wider pr-[0.09rem]">{props.description}</div>
        </div>
	  	<div className="h-full w-11/12">
			<AchievementsProgressBar achievmentprogress={25} />
		</div>
      </div>
    </div>
  );
}
