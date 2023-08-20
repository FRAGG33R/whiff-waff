import { useState } from "react";
import LevelIcon from "../../../public/level.svg";
import Online from "../../../public/online.svg";
import Offline from "../../../public/Offline.svg";
import InGame from "../../../public/InGame.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import router from "next/router";
import Image from "next/image";
import Expert from "../../../public/expert.svg";
import GrandMaster from "../../../public/grandMaster.svg";
import Legend from "../../../public/LEGEND.svg";
import Rookie from "../../../public/Rookie.svg";
import Chanllenger from "../../../public/Challenger.svg";
import { FriendsProps, User, UserData, UserFriend } from "../../types/userFriendType";

export default function FriendGame({ friends }: { friends: User }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChallenge = () => {
    router.push("/game");
  };

  const handleMessage = () => {
    router.push("/chat");
  };

  const handleBlock = () => {};

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div
      className={`w-[95%] h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]
     `}
    >
      <div className="w-[95%] md:w-[98%] h-full flex flex-row items-center justify-center ">
        <div className="h-full w-2/3 flex flex-row items-center  md:space-x-4 space-x-2 2xl:gap-10 ">
          <div
            className="sm:w-1/3 w-12   md:w-16  lg:w-20 h-14  md:h-16 flex  tooltip "
            data-tip={`${friends.userName}  ${friends.stat.level}`}
          >
            <img
              src={friends.avatar}
              alt="profile picture"
              className="sm:w-12 w-16 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          <div
            className={`sm:w-0  lg:w-1/5  font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[2.5rem] lg:block hidden tracking-wide text-Mercury `}
          >
            {friends.userName}
          </div>
          <div className="sm:w-0  lg:w-1/5 flex-row space-x-5 2xl:space-y-3 xl:space-y-2 flex">
            <Image
              src={LevelIcon}
              alt="level icon"
              className="lg:block hidden "
              width={30}
              height={20}
            />
            <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2rem]  xl:block hidden tracking-wide text-Mercury   ">
              Lvl
            </span>
            <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2rem]  lg:block hidden tracking-wide text-Mercury   ">
              {friends.stat.level}
            </span>
          </div>
          <div className="sm:w-1/3 w-12  lg:w-1/5 flex  h-full ">
            {friends.stat.rank === "Rookie" ? (

              <Image
                src={Rookie}
                alt="expert icon"
                width={80}
                height={70}
              />
            ): friends.stat.rank === "Expert" ? (<Image
              src={Expert}
              alt="expert icon"
              width={80}
              height={70}
            />): friends.stat.rank === "GrandMaster" ? (<Image
              src={GrandMaster}
              alt="expert icon"
              width={80}
              height={70}
            />): friends.stat.rank === "Legend" ? (<Image
              src={Legend}
              alt="expert icon"
              width={80}
              height={70}
            />):  (<Image
              src={Chanllenger}
              alt="expert icon"
              width={80}
              height={70}
            />)
          }
          </div>
          <div className="sm:w-1/3 w-12 lg:w-1/5  flex   flex-row space-x-2 space-y-1">
            {/* {friends.status === "Online" ? (
              <Image src={Online} alt="online" width={20} height={20} className="lg:block hidden " />
            ) : friends.status === "Offline" ? (
              <Image src={Offline} alt="offline" width={20} height={20} className="lg:block hidden " />
            ) : (
              <Image src={InGame} alt="InGame" width={20} height={20} className="lg:block hidden " />
            )}
            <span className={`font-medium font-teko text-[1.2rem] xl:text-[1rem] 2xl:text-[1.5rem]  text-center tracking-wide ${friends.status === "Online" ? "text-[#00FF00]" : friends.status === "Offline" ? "text-[#80848E]" : "text-[#FF4F8B]"} `}>
              {friends.status}
            </span> */}
          </div>
        </div>

        <div className="h-full w-1/2 flex flex-row justify-end space-x-2 lg:space-x-4">
          <div className="w-[20%] h-full  items-center justify-center hidden md:flex">
            <PrimaryButton text="Challenge" onClick={handleChallenge} />
          </div>
          <div className="w-[20%] h-full  items-center justify-center hidden md:flex">
            <SecondaryButton text="Block" onClick={handleBlock} />
          </div>
          <div className="w-[20%] h-full  items-center justify-center hidden md:flex">
            <SecondaryButton text="Message" onClick={handleMessage} />
          </div>

          <div className="w-[60%] h-full flex items-center justify-center md:hidden">
            <button className="text-[#CBFC01]" onClick={handleDropdownToggle}>
              &#9660;
            </button>
          </div>
          {isDropdownOpen && (
            <ul className="menu-dropdown-show w-full h-24  bg-HokiCl   rounded-xl flex flex-col  ">
              <li>
                <a>
                  <button
                    className="font-teko text-lg text-Mercury h-8 w-full hover:bg-DeepRose hover:rounded-md"
                    onClick={handleChallenge}
                  >
                    Challenge
                  </button>
                </a>
              </li>
              <li>
                <a>
                  {" "}
                  <button
                    className="font-teko text-lg text-Mercury h-8 w-full hover:bg-DeepRose hover:rounded-md"
                    onClick={handleBlock}
                  >
                    Block
                  </button>
                </a>
              </li>
              <li>
                <a>
                  <button
                    className="font-teko text-lg text-Mercury h-8 w-full hover:bg-DeepRose hover:rounded-md"
                    onClick={handleMessage}
                  >
                    Message
                  </button>
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
