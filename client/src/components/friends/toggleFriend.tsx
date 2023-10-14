import { useState } from "react";
import FriendsComponent from "./friendsComponent";
import FriendRequeste from "./friendRequeste";


const TabSwitch = () => {
  const [activeTab, setActiveTab] = useState(1);
  
  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };


  return (
    <div className="flex items-start justify-start h-[1050px] w-full flex-col space-y-4">
        <div className="w-full h-[10%]  space-x-4 flex flex-row items-center justify-start">
          <div
            className={`flex items-center justify-center rounded-md w-[200px]  h-[90%] text-xl md:text-2xl lg:text-[2.5rem] font-teko text-[#6C7FA7]
            tab-link ${activeTab === 1 ? "tab-link-active" : ""}`}
            onClick={() => handleTabClick(1)}
          >
            Friends
          </div>
          <div
            className={`  flex items-center justify-center rounded-md   w-[300px] h-[90%] text-xl md:text-2xl lg:text-[2.5rem] font-teko text-[#6C7FA7] 
            tab-link ${activeTab === 2 ? "tab-link-active" : ""}`}
            onClick={() => handleTabClick(2)}
          >
           Friend Requests
          </div>
        </div>
        <div className=" w-full h-[90%]  bg-CarbonGrey bg-opacity-10  rounded-xl flex flex-col justify-center">
          <div className={` w-full h-full b
          tab-content ${activeTab !== 1 ? "hidden" : ""}`}>
            <FriendsComponent activeTab={activeTab} />
          </div>
          <div className={`w-full h-full tab-content ${activeTab !== 2 ? "hidden" : ""}`}>
            <FriendRequeste activeTab={activeTab}/>
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
            bottom: 24px;
            width: 100%;
            height: 3px;
            background-color: #CBFC01;
            transform: scaleX(0);
            transition: transform 0.6s ease;
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