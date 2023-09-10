import React, { useRef, useState } from "react";
import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import ScoreGame from "./scoreGame";
import Option from "./option";
import GamePing from "./gameComponent";
import { loggedUserAtom, userAtom } from "@/context/RecoilAtoms";
import { useRecoilState } from "recoil";
import { userType } from "./../../types/userType";
import LoggedInfo from "./loggedInfo";
import AdversarieInfo from "./adversarieInfo";

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
      <div className="h-full w-full space-y-2 xl:space-y-10 pt-2">
        <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full ">
          <NavBar
            level={String((userData as userType).stat.level)}
            avatar={(userData as userType).avatar}
            useName={(userData as userType).userName}
          />
        </div>
        <div className="w-full h-full overflow-y-scroll xl:overflow-y-auto space-y-2 xl:space-y-4 flex flex-col items-start justify-start  ">
          <div className="w-full h-[140px]  2xl:flex  items-center justify-center flex-row gap-2 xl:block hidden">
            <ScoreGame />
          </div>
          <div className="w-full 2xl:h-[1000px]  flex flex-col 2xl:flex-row gap-8 ">
            <div className="w-full 2xl:w-[70%] 2xl:h-full  lg:h-[1000px] flex flex-col md:h-[1000px] h-[800px]  xl:h-[900px] gap-2 ">
              <div className="w-full lg:h-[130px] h-[130px] md:h-[130px] xl:hidden flex items-center justify-start  gap-4 ">
                <LoggedInfo />
              </div>
              <div className="w-full 2xl:w-full 2xl:h-full lg:h-[900px] md:h-[900px] h-[900px] flex-row  justify-center items-center xl:h-[900px] bg-CarbonGrey bg-opacity-10  rounded-xl ">
                {selectedMap && selectedMode && (
                  <GamePing map={selectedMap} mode={selectedMode} />
                )}
              </div>
              <div className="w-full lg:h-[130px] h-[130px] md:h-[130px] xl:hidden flex items-center justify-end  gap-4 ">
                <AdversarieInfo />
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
