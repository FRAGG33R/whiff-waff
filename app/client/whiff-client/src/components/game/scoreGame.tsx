import React, { useEffect, useState } from "react";
import Image from "next/image";
import LevelIcon from "../../../public/LEVEL.svg";
import { idAtom, loggedUserAtom, scoreIdAtom } from "@/context/RecoilAtoms";
import { scoreIdType, userType } from "./../../types/userType";
import { useRecoilState } from "recoil";
import { userDataAtom } from "@/atom/atomStateuser";
import { useRouter } from "next/router";
import Expert from "../../../public/Expert_svg.svg";
import GrandMaster from "../../../public/gameGrandMaster.svg";
import Legend from "../../../public/Legend_svg.svg";
import ROOKIE from "../../../public/ROOKIE_SVG.svg";
import Challenger from "../../../public/CHALLENGER.svg";
import { api } from "../axios/instance";
interface RankItem {
  rank: string;
  image: string;
}
const ScoreGame = () => {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [userId, setUserId] = useRecoilState(idAtom);
  const [userScore, setUserScore] = useRecoilState(scoreIdAtom);
  const [user, setUser] = useState<any>();
  
    const [Game] = useState({
        userName: "Houssam",
        userName1: "Aissam",
        level: 12,
        level1: 2,
        image: "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
    });
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
  const fetchUser = async () => {
    try {
      if (userId !== ''){
      const res = await api.get("/users/profile/" + userId, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUser(res.data.response.user);
    }
    } catch (error) {
    }
  }
  useEffect(() => {
    fetchUser();
    
  }, [userId]);
  return (
    <div className="w-full h-[120px] flex  items-center justify-center flex-row gap-4 ">
      <div className="w-[42%] h-24  flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%] ">
      <div className="h-full lg:w-[33%] 2xl:w-[50%] flex flex-row items-center md:space-x-4 2xl:space-x-2  ">
          <div
            className="3xl:w-[30%] 2xl:w-[40%] xl:w-full lg:w-full h-[80%] flex items-center justify-center tooltip  "
            data-tip={`${(loggedUser as userType).userName}  ${(loggedUser as any).level}`}
          >
            <img
              src={(loggedUser as userType).avatar}
              alt="profile picture"
              className="  2xl:w-16  h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          <div
            className={`3xl:w-[70%] 2xl:w-[60%] font-normal font-teko  2xl:text-[2rem] 3xl:text-[3rem] 2xl:block hidden text-Mercury `}
          >
            {(loggedUser as userType).userName} 
          </div>
          </div>
        <div className=" lg:w-[33%] 2xl:w-[25%]  2xl:flex-row lg:space-x-3 xl:space-x-5  lg:space-y-4 2xl:space-y-3 xl:space-y-2 flex  ">
            <Image
              src={LevelIcon}
              alt="level icon"
              className=" "
              width={40}
              height={35}
            />
            <span className="font-normal font-teko lg:text-[2.3rem] 2xl:text-[2rem] 3xl:text-[3.3rem]  text-Mercury   ">
              Lvl
            </span>
            <span className="font-normal font-teko lg:text-[2.3rem] 2xl:text-[2rem] 3xl:text-[3.3rem]   text-Mercury   ">
              {(loggedUser as any).level}
            </span>
        </div>
        <div className="lg:w-[33%]   2xl:w-[25%] h-full flex items-center justify-center  ">
             {rankItems.map((item, index) => (
              <Image
                src={item.image}
                alt="expert icon"
                width={80}
                height={70}
                key={index}
                className={`${
                  (loggedUser as any).rank === item.rank ? "" : "hidden"
                } `}
              />
            ))}
        </div>

      </div>
      <div className="w-[15%]  h-24   flex items-center justify-center gap-2 3xl:space-x-10 ">
      <div className="w-24  h-16 2xl:h-20 3xl:h-24   flex items-center justify-center rounded-xl 2xl:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-4xl  tracking-wide text-Mercury   ">
        {(userScore as scoreIdType).score1}
            </span>
        </div>
        <div className="w-20 h-14 2xl:h-16 3xl:h-20  flex items-center justify-center rounded-xl 2xl:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-[2.5vw] xl:text-[1rem] 2xl:text-[2rem]   tracking-wide text-GreenishYellow   ">
             VS
            </span>
        </div>
        <div className="w-24  h-16 2xl:h-20 3xl:h-24   flex items-center justify-center rounded-xl 2xl:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-2xl 2xl:text-4xl   tracking-wide text-Mercury   ">
        {(userScore as scoreIdType).score2}
            </span>
        </div> 
      </div>
      <div className="w-[42%] h-24   flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]  gap-2">
        { user &&
        <div className="lg:w-[33%]   2xl:w-[25%] 3xl:w[25%] h-full flex items-center justify-center ">
        {rankItems.map((item, index) => (
              <Image
                src={item.image}
                alt="expert icon"
                width={80}
                height={70}
                key={index}
                className={`${
                  user?.stat.rank === item.rank ? "" : "hidden"
                } `}
              />
            ))}
        </div>

        }
     { user &&
     <div className=" lg:w-[33%] 2xl:w-[25%] 3xl:w[25%] 2xl:flex-row lg:space-x-3 xl:space-x-5  lg:space-y-4 2xl:space-y-3 xl:space-y-2 flex justify-end ">
          <Image
            src={LevelIcon}
            alt="level icon"
            className=" "
            width={40}
            height={35}
          />
          <span className="font-normal font-teko lg:text-[2.3rem] 2xl:text-[2rem] 3xl:text-[3.3rem]  text-Mercury   ">
            Lvl
          </span>
          { user &&
          <span className="font-normal font-teko lg:text-[2.3rem] 2xl:text-[2rem] 3xl:text-[3.3rem]   text-Mercury   ">
            {user?.stat.level}
          </span>

          }
      </div>

     } 
        <div className="h-full lg:w-[33%] 2xl:w-[50%] flex flex-row items-center md:space-x-4 2xl:space-x-8">
      { user &&
        <div
            className={` 3xl:w-[70%] 2xl:w-[60%] font-normal font-teko  2xl:text-[2rem] 3xl:text-[3rem] 2xl:flex  justify-end   hidden text-Mercury `}
          >
            {user?.userName}
          </div>
      }
          {user && <div
            className="  3xl:w-[30%] 2xl:w-[40%] xl:w-full lg:w-full flex items-center justify-center tooltip  "
            data-tip={`${user?.userName}  ${user?.stat.level}`}
          >
            <img
              src={user?.avatar}
              alt=""
              className="  2xl:w-16  h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          }
          </div>
      </div>

    </div>
  );
};

export default ScoreGame;

