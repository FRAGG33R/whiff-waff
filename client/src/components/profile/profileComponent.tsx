import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import AchievementComponent from "./achievementComponents";
import MatchComponents from "./matchComponent";
import ProfileInformations from "./profileInformations";
import RankComponent from "./rankComponent";

export default function ProfileComponent() {
  return (
    <div className="w-[98%] md:w-[98%] h-[96%] md:h-[95%] flex items-center justify-start gap-2 md:gap-10 flex-row text-white">
      <div className="h-full min-w-[65px] w-[75px] md:w-[100px]">
        <SideBar />
      </div>
      <div className="h-full w-[85%] md:w-[95%] space-y-2 md:space-y-8">
        <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
          <NavBar />
        </div>
        <div className="w-full xl:h-[91%] md:h-[93%] lg:h-[91.5%] h-[91.5%] overflow-auto space-y-2 xl:space-y-10">
          <div className="max-w-full w-full h-[600px] lg:h-[350px] flex flex-col lg:flex-row gap-2 md:gap-10">
            <div className="w-full lg:w-[55%] h-full">
              <ProfileInformations />
            </div>
            <div className="w-full lg:w-[45%] h-[40%] lg:h-full">
              <RankComponent />
            </div>
          </div>
          <div className="w-full h-full ">
		  </div>
          {/* <div className="w-full h-full lg:h-[35%] flex flex-col lg:flex-row gap-2 md:gap-10 ">
            <div className="w-full lg:w-[55%] h-full">
				<ProfileInformations />
            </div>
            <div className="w-full lg:w-[45%] h-full ">
              <RankComponent />
            </div>
          </div>
          <div className="w-full h-full flex flex-col-reverse lg:flex-row gap-2 md:gap-10 border-2 border-white">
            <div className="w-full h-[50%] lg:h-full border-2 border-white">
              <MatchComponents />
            </div>
            <div className="w-full lg:w-7/12  h-[50%] lg:h-full border-2 border-white">
              <AchievementComponent />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
