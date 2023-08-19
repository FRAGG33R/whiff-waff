import React, { useState } from "react";
import Image from "next/image";
import LevelIcon from "../../../public/level.svg";
import Challenger from '../../..//public/challenger.svg'

const ScoreGame = () => {
    const [Game] = useState({
        userName: "Houssam",
        userName1: "Aissam",
        level: 1,
        level1: 2,
        image: "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
    });
  return (
    <div className="w-full h-[120px] flex  items-center justify-center flex-row gap-4">
      <div className=" w-[25%] md:w-[30%]  2xl:w-2/5  h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%] gap-8">
      <div className="h-full w-full lg:w-[50%] 2xl:w-[50%] flex flex-row items-center md:space-x-4 2xl:space-x-2   ">
          <div
            className="w-[98%] lg:w-[80%] md:w-[100%] 2xl:w-[30%] h-[80%] flex items-center justify-center tooltip  "
            data-tip={`${Game.userName}  ${Game.level}`}
          >
            <img
              src={Game.image}
              alt="profile picture"
              className="sm:w-12 w-30 2xl:w-16 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          <div
            className={` 2xl:w-[70%] font-normal font-teko  2xl:text-[2.6rem] 3xl:text-[3.3rem] 2xl:block hidden tracking-wide text-Mercury `}
          >
            {Game.userName}
          </div>
          </div>
        <div className=" 2xl:w-[25%]  2xl:flex-row space-x-5 2xl:space-y-3 xl:space-y-2 flex  ">
            <Image
              src={LevelIcon}
              alt="level icon"
              className="2xl:block hidden "
              width={40}
              height={35}
            />
            <span className="font-normal font-teko  2xl:text-[2.6rem] 3xl:text-[3.3rem] 2xl:block hidden tracking-wide text-Mercury   ">
              Lvl
            </span>
            <span className="font-normal font-teko  2xl:text-[2.6rem] 3xl:text-[3.3rem]  2xl:block hidden tracking-wide text-Mercury   ">
              {Game.level}
            </span>
        </div>
        <div className="  lg:w-[50%] 2xl:w-[25%] h-full sm:flex items-center justify-center lg:block hidden  ">
        <Image
              src={Challenger}
              alt="expert icon"
              width={80}
              height={70}
            />
        </div>

      </div>
      <div className=" w-[30%] 2xl:w-1/5 h-[90%] flex  items-center justify-center flex-row gap-4 2xl:gap-10">
        <div className="w-[30%] 2xl:w-[25%] h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2.6rem] 3xl:text-[3.3rem]  tracking-wide text-Mercury   ">
              {Game.level}
            </span>
        </div>
        <div className="w-[25%] 2xl:w-[15%] h-10 md:h-16 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2.6rem] 3xl:text-[3.3rem]   tracking-wide text-GreenishYellow   ">
             VS
            </span>
        </div>
        <div className="w-[30%] 2xl:w-[25%] h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]">
        <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2.6rem] 3xl:text-[3.3rem]   tracking-wide text-Mercury   ">
              {Game.level1}
            </span>
        </div>
      </div>
      <div className=" w-[30%]  2xl:w-2/5  h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%] gap-8">
      <div className="h-full w-[40%] md:w-[50%] 2xl:w-[50%] flex flex-row items-center md:space-x-4 space-x-2   ">
          <div
            className="w-[60%] lg:w-[80%] md:w-[100%] 2xl:w-[30%] h-[80%] flex items-center justify-center tooltip "
            data-tip={`${Game.userName}  ${Game.level}`}
          >
            <img
              src={Game.image}
              alt="profile picture"
              className="sm:w-12 w-20 2xl:w-16 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
            />
          </div>
          <div
            className={`w-0 2xl:w-[70%] font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[2.6rem] 3xl:text-[3.3rem] 2xl:block hidden tracking-wide text-Mercury `}
          >
            {Game.userName}
          </div>
          </div>
        <div className="w-0 2xl:w-[25%]  flex-row space-x-5 2xl:space-y-3 xl:space-y-2 flex ">
            <Image
              src={LevelIcon}
              alt="level icon"
              className="2xl:block hidden "
              width={40}
              height={35}
            />
            <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2.6rem] 3xl:text-[3.3rem] 2xl:block hidden tracking-wide text-Mercury   ">
              Lvl
            </span>
            <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2.6rem] 3xl:text-[3.3rem]  2xl:block hidden tracking-wide text-Mercury   ">
              {Game.level}
            </span>
        </div>
        <div className=" md:bg-black w-[50%] md:w-[50%] 2xl:w-[25%] h-full flex items-center justify-center ">
        <Image
              src={Challenger}
              alt="expert icon"
              width={80}
              height={70}
            />
        </div>


      </div>
    </div>
  );
};

export default ScoreGame;


// <div
// className={`w-[95%] h-16 md:h-20 flex items-center justify-center rounded-[12px] md:rounded-[20px]  bg-[#0F0F0F]/[32%]
// `}
// >
// <div className="w-[95%] md:w-[98%] h-full flex flex-row items-center justify-center ">
//   <div className="h-full w-2/3 flex flex-row items-center  md:space-x-4 space-x-2 2xl:gap-10 ">
//     <div
//       className="sm:w-1/3 w-12   md:w-16  lg:w-20 h-14  md:h-16 flex  tooltip "
//       data-tip={`${friends.userName}  ${friends.stat.level}`}
//     >
//       <img
//         src={friends.avatar}
//         alt="profile picture"
//         className="sm:w-12 w-16 md:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
//       />
//     </div>
//     <div
//       className={`sm:w-0  lg:w-1/5  font-normal font-teko text-[2.5vw] xl:text-[1.4rem] 2xl:text-[2.5rem] lg:block hidden tracking-wide text-Mercury `}
//     >
//       {friends.userName}
//     </div>
//     <div className="sm:w-0  lg:w-1/5 flex-row space-x-5 2xl:space-y-3 xl:space-y-2 flex">
//       <Image
//         src={LevelIcon}
//         alt="level icon"
//         className="lg:block hidden "
//         width={30}
//         height={20}
//       />
//       <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2rem]  xl:block hidden tracking-wide text-Mercury   ">
//         Lvl
//       </span>
//       <span className="font-normal font-teko text-[2.5vw] xl:text-[1.8rem] 2xl:text-[2rem]  lg:block hidden tracking-wide text-Mercury   ">
//         {friends.stat.level}
//       </span>
//     </div>
//     <div className="sm:w-1/3 w-12  lg:w-1/5 flex  h-full ">
//       {friends.stat.rank === "Rookie" ? (

//         <Image
//           src={Rookie}
//           alt="expert icon"
//           width={80}
//           height={70}
//         />
//       ): friends.stat.rank === "Expert" ? (<Image
//         src={Expert}
//         alt="expert icon"
//         width={80}
//         height={70}
//       />): friends.stat.rank === "GrandMaster" ? (<Image
//         src={GrandMaster}
//         alt="expert icon"
//         width={80}
//         height={70}
//       />): friends.stat.rank === "Legend" ? (<Image
//         src={Legend}
//         alt="expert icon"
//         width={80}
//         height={70}
//       />):  (<Image
//         src={Chanllenger}
//         alt="expert icon"
//         width={80}
//         height={70}
//       />)
//     }
//     </div>
//     <div className="sm:w-1/3 w-12 lg:w-1/5  flex   flex-row space-x-2 space-y-1">
//       {/* {friends.status === "Online" ? (
//         <Image src={Online} alt="online" width={20} height={20} className="lg:block hidden " />
//       ) : friends.status === "Offline" ? (
//         <Image src={Offline} alt="offline" width={20} height={20} className="lg:block hidden " />
//       ) : (
//         <Image src={InGame} alt="InGame" width={20} height={20} className="lg:block hidden " />
//       )}
//       <span className={`font-medium font-teko text-[1.2rem] xl:text-[1rem] 2xl:text-[1.5rem]  text-center tracking-wide ${friends.status === "Online" ? "text-[#00FF00]" : friends.status === "Offline" ? "text-[#80848E]" : "text-[#FF4F8B]"} `}>
//         {friends.status}
//       </span> */}
//     </div>
//   </div>

//   <div className="h-full w-1/2 flex flex-row justify-end space-x-2 lg:space-x-4">
//     <div className="w-[20%] h-full  items-center justify-center hidden md:flex">
//       <PrimaryButton text="Challenge" onClick={handleChallenge} />
//     </div>
//     <div className="w-[20%] h-full  items-center justify-center hidden md:flex">
//       <SecondaryButton text="Block" onClick={handleBlock} />
//     </div>
//     <div className="w-[20%] h-full  items-center justify-center hidden md:flex">
//       <SecondaryButton text="Message" onClick={handleMessage} />
//     </div>

//     <div className="w-[60%] h-full flex items-center justify-center md:hidden">
//       <button className="text-[#CBFC01]" onClick={handleDropdownToggle}>
//         &#9660;
//       </button>
//     </div>
//     {isDropdownOpen && (
//       <ul className="menu-dropdown-show w-full h-24  bg-HokiCl   rounded-xl flex flex-col  ">
//         <li>
//           <a>
//             <button
//               className="font-teko text-lg text-Mercury h-8 w-full hover:bg-DeepRose hover:rounded-md"
//               onClick={handleChallenge}
//             >
//               Challenge
//             </button>
//           </a>
//         </li>
//         <li>
//           <a>
//             {" "}
//             <button
//               className="font-teko text-lg text-Mercury h-8 w-full hover:bg-DeepRose hover:rounded-md"
//               onClick={handleBlock}
//             >
//               Block
//             </button>
//           </a>
//         </li>
//         <li>
//           <a>
//             <button
//               className="font-teko text-lg text-Mercury h-8 w-full hover:bg-DeepRose hover:rounded-md"
//               onClick={handleMessage}
//             >
//               Message
//             </button>
//           </a>
//         </li>
//       </ul>
//     )}
//   </div>
// </div>
// </div>
// );
// }