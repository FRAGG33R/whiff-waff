import React from "react";
import { LevelProps } from "../../../types/levelType";

const LevelBar: React.FC<LevelProps> = ({ level, progress }) => {
  return (
    <div className="w-full h-full">
      <div className="md:mb-2 w-full flex items-center justify-between text-HokiCl gap-4">
        <div className="font-semibold text-sm md:text-lg tracking-wide">Level {level}</div>
        <div className="font-semibold text-sm md:text-lg tracking-wide">{progress}/100</div>
      </div>
      <div className="w-full  h-2 md:h-4 bg-HokiCl rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className="bg-GreenishYellow h-2 md:h-4 rounded-full"
        ></div>
      </div>
    </div>
  );
};

export default LevelBar;
