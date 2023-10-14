import React from "react";
import TabSwitch from "./toggleFriend";
import NavBar from "../layout/navBar";
import SideBar from "../layout/sideBar";
import { loggedUserAtom, loggedUserFriendsAtom } from "@/context/RecoilAtoms";
import { useRecoilState } from "recoil";
import { loggedUserType } from "@/types/userType";

const FriendsPage = () => {
  const [loggedUserFriends, setloggedUserFriends] = useRecoilState(loggedUserAtom);
  
  return (
    <div className="w-[98%] h-[96%] md:h-[95%] flex items-center justify-start gap-2 md:gap-10 flex-row overflow-y-hidden">
      <div className="h-full  min-w-[40px] w-[30px] md:w-[100px]">
        <SideBar/>
      </div>
      <div className="h-full w-full space-y-2 xl:space-y-10 pt-2">
        <div className="h-[45px]  md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
        <NavBar level={String((loggedUserFriends as loggedUserType).level)} avatar={(loggedUserFriends as loggedUserType).avatar} useName={(loggedUserFriends as loggedUserType).userName}/>
        </div>
        <div className="w-full xl:h-[88%] md:h-[93%] sm:h-[95%] lg:h-[91.5%] h-[96.5%] overflow-y-scroll xl:overflow-y-auto space-y-2 xl:space-y-10 flex items-start justify-start  scrollbar scrollbar-thumb-GreenishYellow  scrollbar-track-transparent">
          <TabSwitch/>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
