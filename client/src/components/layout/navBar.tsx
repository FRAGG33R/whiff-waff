import SearchInput from "../ui/inputs/searchInput";
import searchIcon from "../../../public/searchIcon.svg";
import badgeIcon from "../../../public/badge.svg";
import NotificationDropDown from "../ui/dropDowns/notificationDropDown";

import Image from "next/image";
import { useState } from "react";
import MessageDropDown from "../ui/dropDowns/messageDropDown";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full 2xl:h-full h-[70%] flex flex-col ">
      <div className="w-full h-full flex flex-row gap-4 md:gap-6  lg:justify-between ">
        <div className="hidden h-full w-[40%] lg:w-[46%] xl:w-[40%] md:flex flex-row items-center bg-[#606060]/[12%] rounded-[20px]">
          <SearchInput
            onSearch={() => {}}
            placeholder="Search for everything..."
          />
        </div>
        <button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="flex h-full w-[15%] md:hidden  items-center justify-center  bg-[#606060]/[12%] rounded-[20px]"
        >
          <Image src={searchIcon} alt="search icon" className="w-5" />
        </button>
        <div className="h-full w-[23%] lg:w-[12%] xl:w[12%] 2xl:w-[10%]  flex flex-row items-center justify-center space-x-2 md:space-x-4 xl:space-x-6 tracking-widest bg-[#606060]/[12%] rounded-[20px]">
          <Image src={badgeIcon} alt="level icon" className="w-4 md:w-6" />
          <div className="text-GreenishYellow font-teko text-lg md:text-2xl xl:text-3xl 2xl:text-4xl pt-2">
            Level 9
          </div>
        </div>
        <div className="h-full w-[18%] lg:w-[15%] xl:w-[10%] flex flex-row gap-4">
          <MessageDropDown
            notifications={[
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello there !",
                time: "2h ago",
              },
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello there !",
                time: "2h ago",
              },
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello there !",
                time: "2h ago",
              },
            ]}
            content={10}
          />
		  <NotificationDropDown notifications={[
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello there !",
                time: "2h ago",
              },
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello there !",
                time: "2h ago",
              },
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello there !",
                time: "2h ago",
              },
            ]}
            content={10} /> 
          {/* <div className="w-[45%] h-full flex items-center justify-center bg-[#606060]/[12%] rounded-[20px]">
			<Image src={chatNotification} alt="chat notification icon" className="w-5 2xl:w-9" />
		  </div> */}
          {/* <div className="w-[45%] h-full flex items-center justify-center bg-[#606060]/[12%] rounded-[20px]">
			<Image src={notification} alt="notification icon" className="w-6 2xl:w-11" />
		  </div> */}
        </div>
        <div className="h-full w-[30%] lg:w-[20%] xl:w-[15%] flex flex-row border-2 border-blue-300"></div>
      </div>

      {open && (
        <div className=" md:hidden w-10/12 h-12 top-24 md:top-28 bg-HokiCl absolute rounded-[20px] ">
          <SearchInput
            onSearch={() => {}}
            placeholder="Search for everything..."
          />
        </div>
      )}
    </div>
  );
}
