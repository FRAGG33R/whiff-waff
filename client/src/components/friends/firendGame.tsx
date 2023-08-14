import { useState } from "react";
import LevelIcon from "../../../public/level.svg"

import Image from "next/image";

export default function MatchComponent() {
  const [friend] = useState({
    firstUserName: "HOUSSAM",
    level: 5,
    rank: "Challenger",
    status: "Online",
  });
  return (
    <div
      className={`w-[95%] h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]
     `}
    >
      <div className="w-[95%] md:w-[98%] h-full flex flex-row items-center justify-center border">
        <div className="h-full w-1/2 flex flex-row items-center  md:space-x-4 space-x-2 2xl:space-x-10  border">
          <div
            className="w-14 md:w-16 h-14  md:h-16 flex items-center justify-center tooltip"
            data-tip={friend.firstUserName}
          >
            <img
              src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
              alt="profile picture"
              className="w-12 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px] "
            />
          </div>
          <div
            className={`font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[2.3rem] text-center md:block hidden tracking-wide text-Mercury`}
          >
            {friend.firstUserName}
          </div>
          <div className="flex flex-row space-x-3 space-y-3" > 
                <Image src={LevelIcon} alt="level icon"  />
                <span className="font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[2.3rem]  md:block hidden tracking-wide text-Mercury ">Lvl {friend.level}</span>
                {/* <span className="text-Mercury text-[1.4rem] font-bold ">{friend.level}</span> */}
          </div>

        </div>
        <div className="h-full w-1/2 flex flex-row items-center  md:space-x-4 space-x-2 2xl:space-x-6  border"></div>
      </div>
      
    </div>
  );
}
