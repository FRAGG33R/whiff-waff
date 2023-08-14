import { useState } from "react";
import FriendsComponent from "./friendsComponent";
import FriendRequeste from "./friendRequeste";

const TabSwitch = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex items-start justify-start h-[1320px] w-full flex-col space-y-4">
        <div className="w-full h-[10%]  space-x-4 flex flex-row items-center justify-start">
          <div
            className={`flex items-center justify-center rounded-md w-[10%] h-[90%] text-[3rem] font-teko text-[#6C7FA7]
            tab-link ${activeTab === 1 ? "tab-link-active" : ""}`}
            onClick={() => handleTabClick(1)}
          >
            Friends
          </div>
          <div
            className={` flex items-center justify-center rounded-md w-[10%] h-[90%] text-[3rem] font-teko text-[#6C7FA7] 
            tab-link ${activeTab === 2 ? "tab-link-active" : ""}`}
            onClick={() => handleTabClick(2)}
          >
           Friend Requests
          </div>
        </div>
        <div className=" w-full h-[90%]  bg-CarbonGrey bg-opacity-10  rounded-xl ">
          <div className={`tab-content ${activeTab !== 1 ? "hidden" : ""}`}>
            <FriendsComponent/>
          </div>
          <div className={`tab-content ${activeTab !== 2 ? "hidden" : ""}`}>
            <FriendRequeste/>
          </div>
        </div>
        <style jsx>{`
    
        .tab-link {
            cursor: pointer;
            position: relative;
          }
  
          .tab-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 100%;
            height: 2px;
            background-color: #CBFC01;
            transform: scaleX(0);
            transition: transform 0.2s ease;
          }
  
          .tab-link-active {
            font-weight: bold;
            color: #E4E5E7;
          }
  
          .tab-link-active::after {
            transform: scaleX(1);
          }
  
        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TabSwitch;