import Image from "next/image";
import { achievementsAvatars } from "@/types/achievements";
import AchievementsProgressBar from "../ui/progressBar/achievementsProgressBar";

export default function SingleAchievements(props : {title : string, description : string, index : number, level : number }) {

  return (
    <div  className="w-[95%] h-16 md:h-24 flex flex-row items-start justify-center rounded-[12px] md:rounded-[20px] bg-[#0F0F0F]/[32%]">
      <div className={`min-w-1 h-full flex items-center justify-start overflow-hidden ${props.level === 100 ? 'null' : 'opacity-40'}`}>
        <Image
          src={achievementsAvatars[props.index]}
          alt="legend achievement avatar"
          className="w-56 h-80 pt-5 -ml-4"
        />
      </div>
      <div className="w-full h-full flex flex-col items-start justify-start md:space-y-3 text-Mercury uppercase -ml-6 md:pt-4">
        <div className="w-full min-h-1 flex flex-col ">
          <div className="text-sm md:text-[1.7rem] font-medium max-h-6 flex items-center tracking-wide font-teko md:pt-0 pt-2">{props.title}</div>
          <div className="text-[0.55rem] md:text-[1rem] font-thin max-h-5 tracking-wider pr-[0.09rem] font-teko">{props.description}</div>
        </div>
	  	<div className="h-full w-11/12 flex items-end md:items-start justify-start">
			<AchievementsProgressBar achievmentprogress={props.level} />
		</div>
      </div>
    </div>
  );
}
