import React from "react";
import InformationsSetting from "./informationsSetting";
import TwoFactor from "./twoFactor";
import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import { useRecoilState } from "recoil";
import { userAtom } from "@/context/RecoilAtoms";
import { userType } from "./../../types/userType";

const SettingPage = () => {
  const [userData, setUserData] = useRecoilState(userAtom);
  
  return (
    <div className="w-[98%] h-[96%] md:h-[95%] flex items-center justify-start gap-2 md:gap-10 flex-row overflow-y-hidden">
      <div className="h-full min-w-[40px] w-[30px] md:w-[100px]">
        <SideBar />
      </div>
      <div className="h-full w-full space-y-2 xl:space-y-10 pt-2">
      <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full ">
		<NavBar level={String((userData as userType).stat.level)} avatar={(userData as userType).avatar} useName={(userData as userType).userName}/>
        </div>
        <div className="w-full xl:h-[91%] md:h-[93%] lg:h-[91.5%] h-[91.5%] overflow-y-scroll xl:overflow-y-auto space-y-2 xl:space-y-10 scrollbar scrollbar-thumb-GreenishYellow  scrollbar-track-transparent">
          <div className="w-full h-[1450px] sm:h-[1400px] md:h-[1340px] lg:h-[1800px] xl:h-[1090px] flex flex-col xl:flex-row gap-2 xl:gap-10 ">
            <div className="w-full xl:w-[60%] h-full  bg-CarbonGrey bg-opacity-10 rounded-xl">
              <InformationsSetting />
            </div>
            <div className="w-full xl:w-[40%] h-full bg-CarbonGrey bg-opacity-10 rounded-xl">
              <TwoFactor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;


