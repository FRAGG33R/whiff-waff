import { useState } from "react";
import WinIcon from "../../../public/totalWins.svg";
import LoseIcon from "../../../public/totalLoses.svg";
import Image from "next/image";

export default function MatchComponent(props: { Mode: "Win" | "Lose" }) {
  const [match] = useState({
    firstUserName: "FRAGGER",
    secondUserName: "MattheDavis",
    firstScore: 5,
    secondScore: 3,
  });
  return (
    <div
      className={`w-[95%] h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px] ${
        props.Mode === "Win" ? "bg-GreenishYellow" : "bg-[#0F0F0F]/[32%]"
      }`}
    >
      <div className="w-[95%] md:w-[98%] h-full flex flex-row items-center justify-center">
        <div className="h-full w-1/3 flex flex-row items-center  md:space-x-4 space-x-2 2xl:space-x-6 ">
          <div className="w-14 md:w-16 h-14  md:h-16 flex items-center justify-center tooltip" data-tip={match.firstUserName}>
            <img
              src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
              alt="profile picture"
              className="w-12 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px] "
            />
          </div>
          <div
            className={`font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[1.6rem] text-center md:block hidden tracking-wide ${
              props.Mode === "Win" ? "text-[#090909]" : "text-white"
            }`}
          >
            {match.firstUserName}
          </div>
        </div>
        <div className="h-full w-1/3 flex flex-row space-x-2 ">
          <div
            className={`h-full w-1/3 flex items-center justify-start md:justify-center text-3xl md:text-4xl font-teko tracking-wide ${
              props.Mode === "Win" ? "text-[#090909]" : "text-white"
            }`}
          >
            {match.firstScore}
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
            {match.secondScore}
          </div>
        </div>
        <div className="h-full w-1/3 flex flex-row items-center justify-end md:space-x-4 space-x-2 2xl:space-x-6">
          <div
            className={`font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[1.6rem] text-center md:block hidden ${
              props.Mode === "Win" ? "text-[#090909]" : "text-white"
            }`}
          >
            {match.secondUserName}
          </div>
          <div className="w-14 md:w-16 h-14 md:h-16 flex items-center justify-center tooltip" data-tip={match.secondUserName}>
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2360&q=80"
              alt="profile picture"
              className="w-12 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
