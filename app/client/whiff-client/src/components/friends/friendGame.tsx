import { useState } from "react";
import LevelIcon from "../../../public/LEVEL.svg";
import Online from "../../../public/online.svg";
import Offline from "../../../public/Offline.svg";
import InGame from "../../../public/InGame.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import router from "next/router";
import Image from "next/image";
import Expert from "../../../public/Expert_svg.svg";
import GrandMaster from "../../../public/gameGrandMaster.svg";
import Legend from "../../../public/Legend_svg.svg";
import ROOKIE from "../../../public/ROOKIE_SVG.svg";
import Challenger from "../../../public/CHALLENGER.svg";
import {
  User
} from "../../types/userFriendType";
import axios from "axios";
import { api } from "../axios/instance";
import { userType } from "@/types/userType";
interface RankItem {
  rank: string;
  image: string;
}
export default function FriendGame({
  friends,
  AcceptedFriends,
  setAcceptedFriends,
}: {
  friends: User;
  AcceptedFriends: User[];
  setAcceptedFriends: Function;
}) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const rankItems: RankItem[] = [
    { rank: "ROOKIE", image: ROOKIE },
    { rank: "EXPERT", image: Expert },
    { rank: "GRANDMASTER", image: GrandMaster },
    { rank: "LEGEND", image: Legend },
    { rank: "", image: Challenger },
  ];
  let jwtToken: string | null = null;

  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("token");
  }
  const handleChallenge = () => {
    router.push(`/game/${friends.userName}`);
  };

  const handleMessage = () => {
    router.push(`/chat/${friends.userName}`);
  };
  
  const handleBlock = async () => {
    try {
      setAcceptedFriends(
        AcceptedFriends.filter((friend: User) => friend.id !== friends.id)
      );
      const res = await api.patch(
        "/users/friendshipResponse",
        {
          id: friends.id,
          status: "BLOCKED",
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    } catch (error) {
    }
    router.push("/friends");
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <div
      className={`w-[95%] h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]
     `}
    >
      <div className="w-[95%] md:w-[98%] h-full flex flex-row items-center justify-center ">
        <div className="h-full w-2/3 md:w-[35%] lg:w-[50%] flex flex-row items-center  md:space-x-4 space-x-2 2xl:gap-10 ">
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
            className={`sm:w-0  lg:w-1/5  font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[2rem] 3xl:text-[2.5rem] lg:block hidden tracking-wide text-Mercury `}
          >
            {friends.userName}
          </div>
          <div className="sm:w-0  lg:w-1/5 flex-row space-x-5 2xl:space-y-3 xl:space-y-2 flex ">
            <Image
              src={LevelIcon}
              alt="level icon"
              className="xl:block hidden "
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
          <div className="sm:w-1/3 w-12 lg:w-1/5 flex h-full">
            {rankItems.map((item, index) => (
              <Image
                src={item.image}
                alt="expert icon"
                width={100}
                height={90}
                key={index}
                className={`${
                  friends.stat.rank === item.rank ? "" : "hidden"
                } sm:w-1/3 w-12 lg:w-1/5 flex  h-full`}
              />
            ))}
          </div>
          <div className="sm:w-1/3 w-12 lg:w-1/5  flex   flex-row space-x-2 space-y-1">
            {(friends as userType).status === "ONLINE" ? (
            <Image
              src={Online}
              alt="online"
              width={20}
              height={20}
              className="lg:block hidden "
            />
            ) : (friends as userType).status === "OFFLINE" ? (
             <Image src={Offline} alt="offline" width={20} height={20} className="lg:block hidden " /> 
             ) : ( 
             <Image src={InGame} alt="InGame" width={20} height={20} className="lg:block hidden " /> 
             )} 
            <span
              className={`font-medium font-teko text-[1.2rem] xl:text-[1rem] 2xl:text-[1.5rem]  text-center tracking-wide text-[#00FF00]"  `}
            >
              {(friends as userType).status}
            </span>
          </div>
        </div>

        <div className="h-full w-1/2 md:w-[65%] lg:w-[50%] flex flex-row justify-end space-x-2 lg:space-x-4">
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
