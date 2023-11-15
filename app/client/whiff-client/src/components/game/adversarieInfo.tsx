import React, { useEffect, useState } from "react";
import LEVEL from "../../../public/LEVEL.svg";
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
import Image from "next/image";

interface RankItem {
  rank: string;
  image: string;
}
const AdversarieInfo = () => {
  const [userId, setUserId] = useRecoilState(idAtom);
  const [userScore, setUserScore] = useRecoilState(scoreIdAtom);
  const [user, setUser] = useState<any>();
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
      if (userId !== "") {
        const res = await api.get("/users/profile/" + userId, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUser(res.data.response.user);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);
  return (
    <div className="w-full lg:h-[130px] h-[130px] md:h-[130px] xl:hidden flex items-center justify-end  gap-4 ">
      <div className="w-[20%] md:w-[15%] lg:w-[20%] lg:h-[100px] h-[100px] md:h-[100px]  flex items-center justify-center gap-2 ">
        <div className="w-24  lg:h-[80px] h-[80px] md:h-[80px]  flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
          <span className="font-normal font-teko text-2xl  md:text-4xl lg:text-4xl  tracking-wide text-Mercury   ">
          {(userScore as scoreIdType).score2}
          </span>
        </div>
      </div>
      <div className="w-[80%] md:w-[70%] lg:w-[60%] lg:h-[80px] h-[80px] md:h-[80px]  flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%] ">
        {
          user &&
        <div className=" lg:w-[40%] md:w-[40%] sm:w-[40%] w-[50%] h-full flex items-center justify-center  ">
          {rankItems.map((item, index) => (
            <Image
              src={item.image}
              alt=""
              width={80}
              height={70}
              key={index}
              className={`${user?.stat.rank === item.rank ? "" : "hidden"} `}
            />
          ))}
        </div>
        }
        {
          user &&
        <div className=" lg:w-[40%] md:w-[40%] sm:w-[40%] sm:flex flex-row justify-center lg:space-x-3  lg:space-y-4  space-x-3 space-y-4 hidden ">
          <Image src={LEVEL} alt="level icon" className=" " width={30} />
          <span className="font-normal font-teko text-[2.3rem]   text-Mercury   ">
            LvL
          </span>
          <span className="font-normal font-teko text-[2.3rem]    text-Mercury   ">
            {user?.stat.level}
          </span>
        </div>
        }

        <div className="h-full lg:w-[20%] md:w-[20%] sm:w-[20%] w-[50%] flex flex-row items-center md:space-x-4 2xl:space-x-2  ">
          { user &&
          <div
            className="h-full w-full flex items-center justify-center tooltip  "
            data-tip={`${user?.userName}  ${user?.stat.level}`}
          >
  
            <img
              src={user?.avatar}
              alt=""
              className="   h-14 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default AdversarieInfo;
