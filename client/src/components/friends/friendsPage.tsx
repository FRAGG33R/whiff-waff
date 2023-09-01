import React from "react";
import TabSwitch from "./toggleFriend";
import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import { useRecoilState } from "recoil";
import { userType } from "./../../types/userType";
import { userDataAtom } from "@/atom/atomStateuser";

const FriendsPage = () => {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  return (
    <div className="w-[98%] h-[96%] md:h-[95%] flex items-center justify-start gap-2 md:gap-10 flex-row overflow-y-hidden">
      <div className="h-full border  min-w-[40px] w-[30px] md:w-[100px]">
        <SideBar/>
      </div>
      <div className="h-full  w-[82%] md:w-[90%] xl:w-[95%] space-y-2 md:space-y-8">
        <div className="h-[45px] border  md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
        <NavBar level={String((userData as userType).stat.level)} avatar={(userData as userType).avatar} useName={(userData as userType).userName}/>
        </div>
        <div className="w-full xl:h-[91%] md:h-[93%] sm:h-[95%] lg:h-[91.5%] h-[96.5%] overflow-y-scroll xl:overflow-y-auto space-y-2 xl:space-y-10 flex items-start justify-start ">
          <TabSwitch/>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
