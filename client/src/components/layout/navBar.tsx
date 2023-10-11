import SearchInput from "../ui/inputs/searchInput";
import searchIcon from "../../../public/searchIcon.svg";
import badgeIcon from "../../../public/badge.svg";
import NotificationDropDown from "../ui/dropDowns/notificationDropDown";
import MessageDropDown from "../ui/dropDowns/messageDropDown";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProfileDropDown from "../ui/dropDowns/profilDropDown";
import { navBarType } from "@/types/layoutType";
import MobileSearchInput from "../ui/inputs/mobileSearchInput";
import { api } from "../axios/instance";
import { useRouter } from "next/router";
import { searchResultType } from "@/types/searchType";

export default function NavBar(props: navBarType) {
  const [open, setOpen] = useState(false);


  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-row justify-between md:gap-4 space-x-1 md:space-x-0">
        <div className="hidden h-full w-[40%] lg:w-[46%] xl:w-[40%] md:flex flex-row items-center bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
          <SearchInput
		 	onSearch={() => {}}
            placeholder="Search for everything..."
          />
        </div>
        <button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="flex h-full min-w-[15%] w-[15%] md:hidden items-center justify-center bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]"
        >
          <Image src={searchIcon} alt="search icon" className="w-5" />
        </button>
        <div className="h-full w-[23%] lg:w-[12%] xl:w[12%] 2xl:w-[10%] hidden sm:flex flex-row items-center justify-center space-x-1 md:space-x-2 xl:space-x-2 2xl:space-x-4 tracking-widest bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
          <Image
            src={badgeIcon}
            alt="level icon"
            className="w-3 md:w-4 xl:w-6"
          />
          <div className="text-GreenishYellow font-teko text-sm md:text-xl xl:text-[1.7rem] 2xl:text-[1.9rem] pt-1 md:pt-2">
            {`Level ${props.level}`}
          </div>
        </div>
        {/* <div className="h-full w-[20%] lg:w-[15%] xl:w-[10%] flex flex-row gap-1 xl:gap-6">
        </div> */}
        <div className="w-32 lg:w-[28%] xl:w-[23%] flex items-center justify-end ">
          <div className="w-full h-full flex items-center justify-end space-x-4">
            <img
              src={props.avatar}
              width={90}
              height={90}
              alt="profile icon"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-4 border-DeepRose rounded-[12px] md:rounded-[20px] "
            />
            <div className="font-teko  font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wider ">
              {props.useName}
            </div>
          </div>
          <ProfileDropDown />
        </div>
      </div>
      {open && (
        <div className="z-10 md:hidden w-[70%] h-12 left-20 top-[4.8rem] bg-Mercury absolute rounded-[12px] md:rounded-[20px]">
          <MobileSearchInput
            onSearch={() => {}}
            placeholder="Search for everything..."
          />
        </div>
      )}
    </div>
  );
}
