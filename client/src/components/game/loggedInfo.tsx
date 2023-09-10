import React, { useState } from 'react'
import LEVEL from "../../../public/LEVEL.svg";
import CHALLENGER from "../../../public/CHALLENGER.svg";
import Image from "next/image";
const LoggedInfo = () => {
    const [Game] = useState({
        userName: "Houssam",
        userName1: "Aissam",
        level: 12,
        level1: 2,
        image:
          "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
      });
  return (
    <div>
        <div className="w-[80%] md:w-[70%] lg:w-[60%] lg:h-[80px] h-[80px] md:h-[80px]  flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%] ">
                  <div className="h-full lg:w-[20%] md:w-[20%] sm:w-[20%] w-[50%] flex flex-row items-center md:space-x-4 2xl:space-x-2  ">
                    <div
                      className="h-full w-full flex items-center justify-center tooltip  "
                      data-tip={`${Game.userName}  ${Game.level}`}
                    >
                      <img
                        src={Game.image}
                        alt="profile picture"
                        className="   h-14 md:h-16 rounded-[12px] md:rounded-[20px]"
                      />
                    </div>
                  </div>
                  <div className=" lg:w-[40%] md:w-[40%] sm:w-[40%] sm:flex flex-row justify-center lg:space-x-3  lg:space-y-4  space-x-3 space-y-4 hidden ">
                    <Image
                      src={LEVEL}
                      alt="level icon"
                      className=" "
                      width={30}
                    />
                    <span className="font-normal font-teko text-[2.3rem]   text-Mercury   ">
                      LvL
                    </span>
                    <span className="font-normal font-teko text-[2.3rem]    text-Mercury   ">
                      {Game.level}
                    </span>
                  </div>
                  <div className=" lg:w-[40%] md:w-[40%] sm:w-[40%] w-[50%] h-full flex items-center justify-center  ">
                    <Image src={CHALLENGER} alt="expert icon" width={70} />
                  </div>
                </div>
                <div className="w-[20%] md:w-[15%] lg:w-[20%] lg:h-[100px] h-[100px] md:h-[100px]  flex items-center justify-center gap-2 ">
                  <div className="w-24  lg:h-[80px] h-[80px] md:h-[80px]  flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
                    <span className="font-normal font-teko text-2xl  md:text-4xl lg:text-4xl  tracking-wide text-Mercury   ">
                      15
                    </span>
                  </div>
                </div>
    </div>
  )
}

export default LoggedInfo;