import Image from "next/image";
import LegendAchievementAvatar from "../../../public/whiff-whaff-legend-achievement.svg";

export default function SingleAchievements() {
  return (
    <div className="w-[95%] h-16 md:h-20 flex flex-row items-center justify-center rounded-[12px] md:rounded-[20px] bg-[#0F0F0F]/[32%]">
      <div className="min-w-1 h-full flex items-center justify-start overflow-hidden">
        <Image
          src={LegendAchievementAvatar}
          alt="legend achievement avatar"
          className="w-44 h-72 pt-5 -ml-4"
        />
      </div>
      <div className="w-full min-h-1 flex flex-col items-start justify-start font-teko text-Mercury uppercase">
        <div className="w-full min-h-1 flex flex-col">
          <div className="text-2xl md:text-[1.7rem] font-medium max-h-6 flex items-center tracking-wide">Whiff-Whaff rookie</div>
          <div className="text-md md:text-[1.1rem] font-thin max-h-5 tracking-wider xl:pl-1">win the first match</div>
        </div>
        {/* <div className="">progressBar</div> */}
      </div>
    </div>
  );
}
