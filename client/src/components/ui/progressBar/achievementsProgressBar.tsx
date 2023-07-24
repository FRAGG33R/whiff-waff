import React from "react";
import { AchievementProps } from "../../../types/levelType";
const AchievementsProgressBar: React.FC<AchievementProps> = ({
  achievmentprogress,
}) => {
  return (
    <div className="flex flex-row justify-between space-x-3 -space-y-2  w-64 sm:w-30 md:w-40 lg:w-64 h-3 md:h-2 lg:h-3">
      <div className="flex  w-64 sm:w-30 md:w-40 lg:w-64 h-3 md:h-2 lg:h-3 bg-HokiCl rounded-full  dark:bg-gray-700">
        <div
          style={{ width: `${achievmentprogress}%` }}
          className="bg-GreenishYellow h-3 md:h-2 lg:h-3 rounded-full"
        ></div>
      </div>
      <div className="text-GreenishYellow">{achievmentprogress}%</div>
    </div>
  );
};

export default AchievementsProgressBar;
