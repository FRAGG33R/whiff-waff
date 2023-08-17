import Image from "next/image";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import LevelBar from "../ui/progressBar/levelBar";
import userType from "@/types/userType";
import totalWins from "../../../public/totalWins.svg";
import totalMatches from "../../../public/totalMatches.svg";
import totalLoses from "../../../public/totalLoses.svg";
import matchStatistics from "@/types/matchStatistics";
import HexaGon from "./hexagon";
import { IconSettings } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { userAtom } from "@/context/RecoilAtoms";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function ProfileInformations() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [userState, setUserState] = useState<userType>(user as userType);

  const matchStatistics: matchStatistics[] = [
    { title: "Total Matches", value: Number(userState.stat.wins) + Number(userState.stat.loses) , avatar: totalMatches },
    { title: "Total Wins", value: userState.stat.wins, avatar: totalWins },
    { title: "Total Loses", value: userState.stat.loses, avatar: totalLoses },
  ];

  return (
    <div className="w-full min-h-1 md:h-full flex flex-col bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
      <div className="w-full h-[80%] flex flex-col md:flex-row items-center xl:space-x-8">
        <div className="h-[70%] md:h-full max-w-[180px] w-[180px] md:w-[27%] xl:w-[25%] md:-space-y-5 xl:space-y-0 flex flex-col">
          <div className="w-full h-[80%] flex items-center justify-center py-8 pl-2">
            <HexaGon avatar={userState.avatar} />
          </div>
          <button
            onClick={() => {
              router.push("/settings");
            }}
            className="w-full h-[20%] flex flex-row justify-center items-center space-x-2 px-2 "
          >
            <IconSettings
              className="w-6 lg:w-8 h-6 lg:h-8"
              color="#6C7FA7"
              stroke={1.5}
            />
            <div className="font-teko font-normal text-xl xl:text-2xl text-HokiCl pt-1 ">
              Edit Profile
            </div>
          </button>
        </div>
        <div className="h-[30%] md:h-full w-[90%] md:w-[75%] flex flex-col">
          <div className="h-full md:h-[70%] max-w-44 flex flex-col space-y-1 md:space-y-2">
            <div className="w-full h-full flex items-end md:justify-start justify-center font-normal md:font-semibold font-teko text-3xl xl:text-4xl 2xl:text-5xl text-Mercury tracking-wider">
              {userState.userName}
            </div>
            <div className="w-full h-full flex flex-row items-center md:justify-start justify-center space-x-2 2xl:space-x-6">
              <SecondaryButton text="Connect" onClick={() => {}} />
              <SecondaryButton text="Message" onClick={() => {}} />
              <PrimaryButton text="Challenge" onClick={() => {}} />
            </div>
            <div className="w-full md:w-10/12 2xl:w-11/12 h-12 py-2 md:h-full flex items-center justify-center">
              <LevelBar level={Math.floor(userState.stat.level)} progress={Number((userState.stat.level % 1).toFixed(2)) * 100} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[24%] flex flex-row items-center justify-around xl:justify-between xl:px-12 border-t-[3px] border-HokiCl">
        {matchStatistics.map((item, index) => (
          <div
            key={index}
            className={`h-full xl:w-1/5 flex items-center justify-center xl:space-x-8 flex-col lg:flex-row font-normal tracking-wide font-teko  ${
              index === 0 ? "pl-4" : null
            }`}>
            <Image
              src={item.avatar}
              alt="total matches"
              className="md:block hidden w-16"
            />
            <div className="min-w-1 min-h-1 w-full flex flex-col md:flex-row lg:flex-col items-start justify-center space-x-0  md:space-x-2 xl:space-x-0 ">
              <div className="text-2xl 2xl:text-3xl 3xl:text-4xl">
                {item.value}
              </div>
              <div className="xl:w-[120px] text-lg 2xl:text-lg 3xl:text-2xl text-HokiCl flex items-center justify-start min-w-1">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
