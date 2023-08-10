import React from "react";
import InformationsSetting from "./informationsSetting";
import TwoFactor from "./twoFactor";
const SettingPage = () => {
  return (
    <div className="w-[98%] h-[96%] md:h-[95%] flex items-center justify-start gap-2 md:gap-10 flex-row overflow-y-hidden">
      <div className="h-full border  min-w-[60px] w-[60px] md:w-[100px]">
        SideBar
      </div>
      <div className="h-full  w-[77%] md:w-[90%] xl:w-[95%] space-y-2 md:space-y-8">
        <div className="h-[45px] border  md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
          NavBar
        </div>
        <div className="w-full xl:h-[91%] md:h-[93%] lg:h-[91.5%] h-[91.5%] overflow-y-scroll overflow-x-hidden lg:overflow-y-auto space-y-2 xl:space-y-10">
          <div className="w-full h-[700px] lg:h-[850px] flex flex-col lg:flex-row gap-2 xl:gap-10 ">
            <div className="w-full lg:w-[60%] h-full  bg-CarbonGrey bg-opacity-10  rounded-xl ">
              <InformationsSetting />
            </div>
            <div className="w-full lg:w-[40%] h-[40%] lg:h-full  bg-CarbonGrey bg-opacity-10  rounded-xl ">
              <TwoFactor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
