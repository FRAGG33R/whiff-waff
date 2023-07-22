import React from "react";
import { Typography } from "@material-tailwind/react";

const LevelBar = () => {
  return (
    
    <div className="w-64 sm:w-30 md:w-40 lg:w-64 h-3 md:h-2 lg:h-3">
      <div className="mb-2 flex items-center justify-between text-HokiCl gap-4">
        <Typography  variant="small">
          Level 9
        </Typography>
        <Typography  variant="small">
          23/100
        </Typography>
      </div>
      <div className="w-64 sm:w-30 md:w-40 lg:w-64 h-3 md:h-2 lg:h-3 bg-HokiCl rounded-full  dark:bg-gray-700">
        <div
          style={{ width: "60%" }}
          className="bg-GreenishYellow h-3 md:h-2 lg:h-3 rounded-full"
        ></div>
      </div>
    </div>
  );
};

export default LevelBar;
