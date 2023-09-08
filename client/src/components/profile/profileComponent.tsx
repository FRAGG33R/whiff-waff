import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import AchievementComponent from "./achievementComponents";
import MatchComponents from "./matchHistoryComponent";
import ProfileInformations from "./profileInformations";
import RankComponent from "./rankComponent";
import { loggedUserAtom } from "@/context/RecoilAtoms";
import { useRecoilState } from "recoil";
import { loggedUserType } from "@/types/userType";

export default function ProfileComponent()
{
	const [loggedUser, setLoggedUser ] = useRecoilState(loggedUserAtom);

  return (
    <div className="w-[98%] h-[98%] md:h-[97%] flex items-center justify-start gap-2 xl:gap-10 flex-row text-white overflow-y-hidden pt-2">
      <div className="h-full min-w-[60px] w-[60px] md:w-[100px] pt-2">
		<SideBar />
      </div>
      <div className="h-full w-full space-y-2 xl:space-y-10 pt-2 ">
        <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
			<NavBar level={String((loggedUser as loggedUserType).level)} avatar={(loggedUser as loggedUserType).avatar} useName={(loggedUser as loggedUserType).userName}/>
        </div>
        <div className="w-full xl:h-[91%] md:h-[93%] lg:h-[91.5%] h-[91.5%] overflow-y-scroll overflow-x-hidden lg:overflow-y-auto space-y-2 xl:space-y-10">
          <div className="w-full h-[700px] lg:h-[350px] flex flex-col lg:flex-row gap-2 xl:gap-10">
            <div className="w-full lg:w-[55%] h-full">
              <ProfileInformations />
            </div>
            <div className="w-full lg:w-[45%] h-[40%] lg:h-full">
              <RankComponent />
            </div>
          </div>
          <div className="w-full flex flex-col  xl:flex-row justify-start gap-2 xl:gap-0 xl:space-x-10">
            <div className="w-full h-[500px] md:h-[690px] xl:h-[690px]">
              <MatchComponents />
            </div>
            <div className="w-full xl:w-3/5 h-[590px] xl:h-[690px]">
              <AchievementComponent />
			</div>
          </div>
        </div>
      </div>
    </div>
  );
}
