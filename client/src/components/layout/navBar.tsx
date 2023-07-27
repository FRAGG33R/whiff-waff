import SearchInput from "../ui/inputs/searchInput";
import searchIcon from "../../../public/searchIcon.svg";
import badgeIcon from "../../../public/badge.svg";
import NotificationDropDown from "../ui/dropDowns/notificationDropDown";
import MessageDropDown from "../ui/dropDowns/messageDropDown";
import Image from "next/image";
import { useState } from "react";
import ProfileDropDown from "../ui/dropDowns/profilDropDown";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-row gap-2 md:gap-6 justify-between ">
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
        <div className="h-full w-[23%] lg:w-[12%] xl:w[12%] 2xl:w-[10%] flex flex-row items-center justify-center space-x-1 md:space-x-2 xl:space-x-4 2xl:space-x-5 tracking-widest bg-[#606060]/[12%] rounded-[20px]">
          <Image src={badgeIcon} alt="level icon" className="w-3 md:w-6" />
          <div className="text-GreenishYellow font-teko text-md md:text-2xl xl:text-3xl 2xl:text-[1.9rem] md:pt-2">
            Level 9
          </div>
        </div>
        <div className="h-full w-[20%] lg:w-[15%] xl:w-[10%] flex flex-row gap-1 xl:gap-6">
          <MessageDropDown
            notifications={[
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello there dsafadsfasfsdfadsfasdfas!",
                time: "2h ago",
              },
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello thereasdfasdfasdfasdfadsfasdfasf !",
                time: "2h ago",
              },
              {
                avatar: "https://i.imgur.com/1Qwk9rX.png",
                name: "John Doe",
                message: "Hello there sadfadsfsdfdsfdfghjk!",
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
            content={4} />
        </div>
        <div className="h-full w-[30%] lg:w-[20%] xl:w-[15%] flex flex-row border-2 border-red-400">
			<ProfileDropDown />
		</div>
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
