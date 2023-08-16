import React, { useState } from "react";
import Image from "next/image";
import LevelIcon from "../../../public/level.svg";
import Challenger from '../../..//public/challenger.svg'

const ScoreGame = () => {
    const [Game] = useState({
        userName: "Houssam",
        userName1: "Aissam",
        level: 1,
        level1: 2,
        image: "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
    });
  return (
    <div className="w-full h-[120px] flex  items-center justify-center flex-row">
      <div className=" w-2/5 h-[90%] flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%] gap-8">
      <div className="h-full w-[50%] flex flex-row items-center md:space-x-4 space-x-2   ">
          <div
            className="w-[30%] h-[80%] flex items-center justify-center tooltip "
            data-tip={`${Game.userName}  ${Game.level}`}
          >
            <img
              src={Game.image}
              alt="profile picture"
              className="sm:w-12 w-16 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          <div
            className={` w-[70%] font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[3.5rem] lg:block hidden tracking-wide text-Mercury `}
          >
            {Game.userName}
          </div>
          </div>
        <div className="sm:w-0  lg:w-[25%]  flex-row space-x-5 2xl:space-y-3 xl:space-y-2 flex ">
            <Image
              src={LevelIcon}
              alt="level icon"
              className="lg:block hidden "
              width={40}
              height={35}
            />
            <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[3rem]  xl:block hidden tracking-wide text-Mercury   ">
              Lvl
            </span>
            <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[3rem]  lg:block hidden tracking-wide text-Mercury   ">
              {Game.level}
            </span>
        </div>
        <div className="w-[25%] h-full flex items-center justify-center ">
        <Image
              src={Challenger}
              alt="expert icon"
              width={80}
              height={70}
            />
        </div>

      </div>
      <div className=" w-1/5 h-[90%] flex  items-center justify-center flex-row gap-10">
        <div className="w-[25%] h-full flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[3.3rem]  lg:block hidden tracking-wide text-Mercury   ">
              {Game.level}
            </span>
        </div>
        <div className="w-[15%] h-[60%] flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[3rem]  xl:block hidden tracking-wide text-GreenishYellow   ">
             VS
            </span>
        </div>
        <div className="w-[25%] h-full flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[3.3rem]  lg:block hidden tracking-wide text-Mercury   ">
              {Game.level1}
            </span>
        </div>
      </div>
      <div className=" w-2/5 h-[90%] flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%] gap-8">
      <div className="h-full w-[50%] flex flex-row items-center md:space-x-4 space-x-2   ">
          <div
            className="w-[30%] h-[80%] flex items-center justify-center tooltip "
            data-tip={`${Game.userName1}  ${Game.level1}`}
          >
            <img
              src={Game.image}
              alt="profile picture"
              className="sm:w-12 w-16 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          <div
            className={` w-[70%] font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[3.5rem] lg:block hidden tracking-wide text-Mercury `}
          >
            {Game.userName1}
          </div>
          </div>
        <div className="sm:w-0  lg:w-[25%]  flex-row space-x-5 2xl:space-y-3 xl:space-y-2 flex ">
            <Image
              src={LevelIcon}
              alt="level icon"
              className="lg:block hidden "
              width={40}
              height={35}
            />
            <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[3rem]  xl:block hidden tracking-wide text-Mercury   ">
              Lvl
            </span>
            <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[3rem]  lg:block hidden tracking-wide text-Mercury   ">
              {Game.level1}
            </span>
        </div>
        <div className="w-[25%] h-full flex items-center justify-center ">
        <Image
              src={Challenger}
              alt="expert icon"
              width={80}
              height={70}
            />
        </div>

      </div>
    </div>
  );
};

export default ScoreGame;
