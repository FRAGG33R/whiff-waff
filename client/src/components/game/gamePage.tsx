import React, { use, useRef, useState } from "react";
import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import ScoreGame from "./scoreGame";
import Option from "./option";
import GamePing from "./gameComponent";
import LevelIcon from "../../../public/level.svg";
import Challenger from "../../..//public/challenger.svg";
import PingPongTable from "./Rectangle";
import Image from "next/image";
import { loggedUserAtom, userAtom } from "@/context/RecoilAtoms";
import { useRecoilState } from "recoil";
import { userType } from "./../../types/userType";
import { userDataAtom } from "@/atom/atomStateuser";

const GamePage: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<string>("");
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [userData, setUserData] = useRecoilState(userAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);

  const [Game] = useState({
    userName: "Houssam",
    userName1: "Aissam",
    level: 12,
    level1: 2,
    image:
      "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
  });

  const handlePlay = (map: string, mode: string) => {
    setSelectedMap(map);
    setSelectedMode(mode);
  };

  return (
    <div className="w-[98%] h-[98%] md:h-[97%] flex items-center justify-start gap-2 md:gap-10 flex-row pt-2 overflow-hidden">
      <div className="h-full min-w-[40px] w-[30px] md:w-[100px] pt-2">
        <SideBar />
      </div>
      <div className="h-full w-[89%] md:w-full space-y-2 md:space-y-10 pt-2">
        <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
          <NavBar
            level={String((userData as userType).stat.level)}
            avatar={(userData as userType).avatar}
            useName={(userData as userType).userName}
          />
        </div>
        <div className="w-[99%] md:h-[93%] sm:h-[95%] lg:h-[91.5%] h-[96.5%] overflow-y-auto scrollbar scrollbar-track-rounded-full scrollbar-thumb-GreenishYellow  scrollbar-track-transparent  space-y-2 xl:space-y-10 flex flex-col items-start justify-start  ">
          <div className="w-full h-[140px] 2xl:flex items-center justify-center flex-row gap-2 xl:block hidden">
            <ScoreGame />
          </div>
          <div className="w-full 2xl:h-[1200px]  flex flex-col 2xl:flex-row gap-8 ">
            <div className="w-full 2xl:w-[70%] 2xl:h-full  lg:h-[1000px] flex flex-col md:h-[1000px] h-[1000px]  xl:h-[900px] gap-2 ">
              <div className="w-full lg:h-[130px] h-[130px] md:h-[130px] xl:hidden flex items-center justify-start  gap-4 ">
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
                      src={LevelIcon}
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
                    <Image src={Challenger} alt="expert icon" width={70} />
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
              <div className="w-full 2xl:w-full 2xl:h-full lg:h-[900px] md:h-[900px] h-[900px] flex-row  justify-center items-center xl:h-[900px] bg-CarbonGrey bg-opacity-10  rounded-xl">
                {selectedMap && selectedMode && (
                  <GamePing map={selectedMap} mode={selectedMode} />
                )}
              </div>
              <div className="w-full lg:h-[130px] h-[130px] md:h-[130px] xl:hidden flex items-center justify-end  gap-4 ">
                <div className="w-[20%] md:w-[15%] lg:w-[20%] lg:h-[100px] h-[100px] md:h-[100px]  flex items-center justify-center gap-2 ">
                  <div className="w-24  lg:h-[80px] h-[80px] md:h-[80px]  flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
                    <span className="font-normal font-teko text-2xl  md:text-4xl lg:text-4xl  tracking-wide text-Mercury   ">
                      15
                    </span>
                  </div>
                </div>
                <div className="w-[80%] md:w-[70%] lg:w-[60%] lg:h-[80px] h-[80px] md:h-[80px]  flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%] ">
                  <div className=" lg:w-[40%] md:w-[40%] sm:w-[40%] w-[50%] h-full flex items-center justify-center  ">
                    <Image src={Challenger} alt="expert icon" width={70} />
                  </div>
                  <div className=" lg:w-[40%] md:w-[40%] sm:w-[40%] sm:flex flex-row justify-center lg:space-x-3  lg:space-y-4  space-x-3 space-y-4 hidden ">
                    <Image
                      src={LevelIcon}
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
                </div>
              </div>
            </div>
            <div className="w-full 2xl:w-[30%] 2xl:h-full xl:h-[900px] lg:h-[900px] md:h-[900px] h-[900px]  bg-CarbonGrey bg-opacity-10  rounded-xl ">
              <Option onPlay={handlePlay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
