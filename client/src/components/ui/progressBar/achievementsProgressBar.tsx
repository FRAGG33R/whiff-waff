import React from "react";
import { AchievementProps } from "../../../types/levelType";
const AchievementsProgressBar: React.FC<AchievementProps> = ({
  achievmentprogress,
}) => {
  return (
    <div className="flex flex-row justify-between space-x-2 -space-y-2 w-full h-3 md:h-2 lg:h-3">
      <div className="flex w-full h-2 md:h-3 bg-HokiCl rounded-full ">
        <div
          style={{ width: `${achievmentprogress}%` }}
          className="bg-GreenishYellow  h-2 md:h-3 rounded-full"
        ></div>
      </div>
      <div className="text-GreenishYellow pt-[3.5px] md:pt-[1px] font-medium text-sm md:text-lg ">{achievmentprogress}%</div>
    </div>
  );
};

export default AchievementsProgressBar;
