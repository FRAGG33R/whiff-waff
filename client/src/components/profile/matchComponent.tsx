import { useState } from "react";
import WinIcon from "../../../public/totalWins.svg";
import LoseIcon from "../../../public/totalLoses.svg";
import Image from "next/image";
import matchComponentType from "@/types/matchType";

export default function MatchComponent(props: matchComponentType) {

  return (
    <div
      className={`w-[95%] h-16 md:h-24 flex items-center justify-center rounded-[12px] md:rounded-[20px] ${
        props.Mode === "Win" ? "bg-GreenishYellow" : "bg-[#0F0F0F]/[32%]"
      }`}
    >
      <div className="w-[95%] md:w-[98%] h-full flex flex-row items-center justify-center">
        <div className="h-full w-1/3 flex flex-row items-center  md:space-x-4 space-x-2 2xl:space-x-6 ">
          <div className="w-14 md:w-20 h-14 md:h-20 flex items-center justify-center tooltip" data-tip={props.firstUserName}>
            <img
              src={props.firstUserAvatar}
              alt="profile picture"
              className="w-12 md:w-20 h-12 md:h-20 rounded-[12px] md:rounded-[20px] "
            />
          </div>
          <div
            className={`font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[2rem] text-center md:block hidden tracking-wide ${
              props.Mode === "Win" ? "text-[#090909]" : "text-white"
            }`}
          >
            {props.firstUserName}
          </div>
        </div>
        <div className="h-full w-1/3 flex flex-row space-x-2 ">
          <div
            className={`h-full w-1/3 flex items-center justify-start md:justify-center text-3xl md:text-4xl font-teko tracking-wide ${
              props.Mode === "Win" ? "text-[#090909]" : "text-white"
            }`}
          >
            {props.firstScore}
          </div>
          <div className="h-full w-1/3 flex items-center flex-col md:-space-y-3 justify-center text-[2.8vw] xl:text-[1.6rem] 2xl:text-4xl font-teko">
			{props.Mode === "Win" ? (
				<Image src={WinIcon} alt="win icon" className="" />
			) : (
				<Image src={LoseIcon} alt="win icon" className="" />
			)}
			<div className={`custom_stroke ${props.Mode === 'Win' ? '' : ''}  md:text-3xl `}>{props.Mode === 'Win' ? 'VECTORY' : 'DEFEAT'}</div>
		  </div>
          <div
            className={`h-full w-1/3 flex items-center justify-end  md:justify-center text-3xl md:text-4xl font-teko ${
              props.Mode === "Win" ? "text-[#090909]" : "text-white"
            }`}
          >
            {props.secondScore}
          </div>
        </div>
        <div className="h-full w-1/3 flex flex-row items-center justify-end md:space-x-4 space-x-2 2xl:space-x-6">
          <div
            className={`font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[2rem] text-center md:block hidden ${
              props.Mode === "Win" ? "text-[#090909]" : "text-white"
            }`}
          >
            {props.secondUserName}
          </div>
          <div className="w-14 md:w-20 h-14 md:h-20 flex items-center justify-center tooltip" data-tip={props.secondUserName}>
            <img
              src={props.secondUserAvatar}
              alt="profile picture"
              className="w-12 md:w-20 h-12 md:h-20 rounded-[12px] md:rounded-[20px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
