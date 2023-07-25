import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import AchievementComponent from "./achievementComponents";
import MatchComponents from "./matchComponent";
import ProfileInformations from "./profileInformations";
import RankComponent from "./rankComponent";

export default function ProfileComponent() {

  return (
    <div className="w-full md:w-[98%] h-full md:h-[95%] flex items-center justify-start flex-row gap-4 md:gap-10 text-white">
      <div className="h-full w-[15%] md:w-[10%] lg:w-[8%] xl:w-[5%]">
		<SideBar />
	  </div>
      <div className="h-full w-full flex flex-col gap-4 md:gap-10 border-2 border-white">
        <div className="h-[7%] w-full border-2 border-white">
			<NavBar />
		</div>
        <div className="h-[93%] w-full border-2 border-white overflow-auto lg:overflow-hidden flex flex-col gap-4 md:gap-10">
          <div className="w-full h-[60%] lg:h-[35%] flex flex-col lg:flex-row gap-4 md:gap-10 border-2 border-white ">
            <div className="w-full lg:w-[55%] h-full border-2 border-white">
				<ProfileInformations />
            </div>
            <div className="w-full lg:w-[45%] h-full border-2 border-white">
              <RankComponent />
            </div>
          </div>
          <div className="w-full h-full flex flex-col-reverse lg:flex-row gap-4 md:gap-10 border-2 border-white">
            <div className="w-full h-[50%] lg:h-full border-2 border-white">
              <MatchComponents />
            </div>
            <div className="w-full lg:w-7/12  h-[50%] lg:h-full border-2 border-white">
              <AchievementComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
