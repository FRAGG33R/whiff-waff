import React from "react";
import InformationsSetting from "./informationsSetting";
import TwoFactor from "./twoFactor";
const SettingPage = () => {
  return (
    <div className="w-[99%] md:w-[98%] h-[95%] sm:w-full flex items-center justify-start flex-row gap-4 md:gap-10 text-white">
      <div className="h-full w-[15%] md:w-[10%] sm:w-[11%] lg:w-[8%] xl:w-[5%] border border-green-500 ">
     
      </div>
      <div className="h-full w-full flex flex-col 3xl:w-full 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-[80%] gap-4 md:gap-10 ">
        <div className="h-[5%] md:h-[7%] w-full   border border-green-500 ">
      
        </div>
        <div className="h-[90%] md:h[92%]   flex flex-col md:flex-row  gap-4 md:gap-10 overflow-auto md:overflow-hidden">
          <div className="flex items-center justify-center h-full md:w-[60%] w-full lg:w-[60%]  bg-CarbonGrey bg-opacity-10  rounded-xl ">
            <InformationsSetting />
          </div>
          <div className=" flex items-center justify-center  h-full  md:w-[40%] w-full  lg-w-[40%] bg-CarbonGrey bg-opacity-10  rounded-xl">
            <TwoFactor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
