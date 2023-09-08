import Image from "next/image";
import AchievementsIcon from "../../../public/achievementsIcon.svg";
import { useRecoilState } from "recoil";
import { userAtom } from "@/context/RecoilAtoms";
import SingleAchievements from "./singleAchievements";

export default function AchievementComponent() {
	const [user, setUser] = useRecoilState(userAtom) as any;
	
  return (
    <div className="w-full h-full flex flex-col bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
      <div className="w-full h-[9%]  md:h-[12%] flex flex-row items-center space-x-2 md:space-x-4 px-3 md:px-10 md:py-2  ">
        <Image
          src={AchievementsIcon}
          alt="match history icon"
          className="w-7 md:w-10"
        />
        <div className="font-semibold font-teko text-2xl md:text-[1.9rem] tracking-wide text-Mercury md:pt-2">
          ACHIEVEMENTS
        </div>
      </div>
      <div className="w-full h-[90%] md:h-[95%] flex flex-col items-center space-y-4">
		{user.achievements.map((item : any, index : number) => (
			<div key={index * Math.random()} className="w-full flex justify-center min-h-1">
				<SingleAchievements index={index} title={item.achievement.name} description={item.achievement.description} level={item.level}/>
			</div>
		))}
	  </div>
    </div>
  );
}
