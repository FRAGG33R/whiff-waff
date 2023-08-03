import React from "react";
import { Typography } from "@material-tailwind/react";
import { LevelProps } from "../../../types/levelType";

const LevelBar: React.FC<LevelProps> = ({ level, progress }) => {
  return (
    <div className="w-full h-full bg-red">
      <div className="mb-2 w-8/12 flex items-center justify-between text-HokiCl gap-4">
        <div className="font-semibold text-lg tracking-wide">Level {level}</div>
        <div className="font-semibold text-lg tracking-wide">{progress}/100</div>
      </div>
      <div className="w-8/12 h-4 bg-HokiCl rounded-full dark:bg-gray-700">
        <div
          style={{ width: `${progress}%` }}
          className="bg-GreenishYellow h-4 rounded-full"
        ></div>
      </div>
    </div>
  );
};

export default LevelBar;
