import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import AchievementComponent from "./achievementComponents";
import MatchComponents from "./matchHistoryComponent";
import ProfileInformations from "./profileInformations";
import RankComponent from "./rankComponent";
import { loggedUserAtom, socketAtom } from "@/context/RecoilAtoms";
import { useRecoilState } from "recoil";
import { loggedUserType } from "@/types/userType";
import { use, useContext, useEffect, useState , createContext } from "react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import { Socket } from "dgram";




export default function ProfileComponent()
{
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loggedUser] = useRecoilState(loggedUserAtom);  

  return (
    <div className="w-[98%] h-[98%] md:h-[97%] flex items-center justify-start gap-2 xl:gap-10 flex-row text-white pt-2 overflow-hidden">
      <div className="h-full min-w-[60px] w-[60px] md:w-[100px] pt-2">
		<SideBar />
      </div>
      <div className="h-full w-[89%] md:w-full space-y-2 xl:space-y-10 pt-2 ">
        <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
			<NavBar level={String((loggedUser as loggedUserType).level)} avatar={(loggedUser as loggedUserType).avatar} useName={(loggedUser as loggedUserType).userName}/>
        </div>
        <div className="w-full h-[92%] overflow-y-auto space-y-2 xl:space-y-10 scrollbar scrollbar-thumb-GreenishYellow  scrollbar-track-transparent ">
          <div className="w-full h-[700px] lg:h-[350px] flex flex-col lg:flex-row gap-2 xl:gap-10">
            <div className="w-full lg:w-[55%] h-full">
              <ProfileInformations />
            </div>
            <div className="w-full lg:w-[45%] h-[40%] lg:h-full">
              <RankComponent />
            </div>
          </div>
          <div className="w-full flex flex-col xl:flex-row justify-start gap-2 xl:gap-10">
            <div className="w-full h-[500px] md:h-[690px] xl:h-[700px]">
              <MatchComponents />
            </div>
            <div className="w-full xl:w-3/5 h-[500px] md:h-[790px] xl:h-[700px]">
              <AchievementComponent />
			</div>
          </div>
        </div>
      </div>
    </div>
  );
}
