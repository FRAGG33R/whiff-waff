import React from "react";
import Beginner from "./../../../public/Beginner.svg";
import Intermediare from "./../../../public/Intermediare.svg";
import Advanced from "./../../../public/Advenced.svg";
import Time from "./../../../public/Time.svg";
import Defi from "./../../../public/Defi.svg";
import PrimaryButton from "../../components/ui/buttons/primaryButton";
import Image from "next/image";
import { useState } from "react";
import { loggedUserAtom } from "@/context/RecoilAtoms";
import { useRecoilState } from "recoil";
import { userType } from "./../../types/userType";
import { userDataAtom } from "@/atom/atomStateuser";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
interface OptionProps {
  onPlay: (map: string, mode: string) => void;
}
const Option: React.FC<OptionProps> = ({ onPlay }) => {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [Game] = useState({
    userName: "Houssam",
    userName1: "Aissam",
    level: 12,
    level1: 2,
    image:
      "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
  });
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [beginner, setBeginner] = useState(false);
  const [inrermediare, setInrermediare] = useState(false);
  const [advenced, setAdvenced] = useState(false);
  const [time, setTime] = useState(false);
  const [defi, setDefi] = useState(false);
  const name = "houssam";
  console.log((userData as userType).userName);
  const [open, setDialogOpen] = useState(false);
  const [isFindingPlayer, setIsFindingPlayer] = useState(true);

  const handleOpen = () => {
    setDialogOpen(!open);
  };
  const handleTime = () => {
    setTime(!time);
    setDefi(false);
  };
  const handleDefi = () => {
    setDefi(!defi);
    setTime(false);
  };
  const handleBeginner = () => {
    setBeginner(!beginner);
    setInrermediare(false);
    setAdvenced(false);
  };
  const handleIntermediare = () => {
    setInrermediare(!inrermediare);
    setBeginner(false);
    setAdvenced(false);
  };
  const handleAdvenced = () => {
    setAdvenced(!advenced);
    setInrermediare(false);
    setBeginner(false);
  };
  const handlePlay = () => {
    let selectedMap: string | undefined;
    if (beginner) {
      selectedMap = "Beginner";
    } else if (inrermediare) {
      selectedMap = "Intermediate";
    } else if (advenced) {
      selectedMap = "Advanced";
    }

    let selectedMode: string | undefined;
    if (time) {
      selectedMode = "Time";
    } else if (defi) {
      selectedMode = "Defi";
    }
    setDialogOpen(false);
    if (selectedMap && selectedMode) {
      onPlay(selectedMap, selectedMode);
    } else {
      console.log("Select a map and a mode to play");
    }
  };
  return (
    <div className="w-full 2xl:h-full flex  flex-col gap-4 md:gap-6  ">
      <div className=" w-full 2xl:h-[120px] flex  flex-col items-center justify-center">
        <div className=" w-full 2xl:h-[100px] flex items-center justify-center font-teko 2xl:text-[3.5rem] text-[2.5rem] md:text-[3.3rem] lg:text-[3rem] text-[#FFFFFF] ">
          Option
        </div>
        <div className=" w-[80%] 2xl:h-[5px] xl:h-[8px] lg:h-[8px] md:h-[6px] h-[5px] flex items-center bg-GreenishYellow justify-center font-teko " />
      </div>
      <div className=" w-full 2xl:h-[950px] xl:h-[800px] lg:h-[800px] md:h-[800px] h-[800px] flex  justify-center ">
        <div className="w-full 2xl:h-full flex  flex-col items-center justify-center gap-6 ">
          <div className="w-[80%] md:w-[60%] xl:w-[60%] lg:w-[60%] 2xl:w-[80%] 2xl:h-full xl:h-[60%] lg:h-[60%] md:h-[60%] h-[60%] flex flex-col items-center justify-center gap-6">
            <div className="w-full 2xl:h-[100px] flex items-center justify-start  font-teko text-[#FFFFFF] text-[2rem] md:text-[3rem] lg:text-[3rem] 2xl:text-[3rem] ">
              Maps
            </div>
            <button
              className={`w-full 2xl:h-[110px] h-[100px] flex flex-row items-center justify-center rounded-3xl bg-opacity-10 gap-2 
          ${
            beginner
              ? "bg-[#24A6CF] hover:animate-pulse"
              : "bg-[#606060] hover:animate-pulse"
          }`}
              onClick={handleBeginner}
            >
              <div className="w-[50%] 2xl:h-[90px] flex items-center justify-start ">
                <span
                  className="font-teko text-[#E4E5E7] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] 2xl:text-[2rem] 3xl:text-[4rem] transition-colors duration-300"
                  style={{ textShadow: "3px 5px 25px #24A6CF" }}
                >
                  Beginner
                </span>
              </div>

              <div
                className={`w-[40%] 2xl:h-[90px] flex items-center justify-center transition-opacity duration-300 ${
                  beginner ? "opacity-100" : "opacity-50"
                }`}
              >
                <Image src={Beginner} alt="Beginner" width={130} />
              </div>
            </button>
            <button
              className={`w-full 2xl:h-[110px] h-[100px] flex flex-row items-center justify-center rounded-3xl bg-opacity-10 gap-2 
                ${
                  inrermediare
                    ? "bg-[#E79BA5] hover:animate-pulse"
                    : "bg-[#606060] hover:animate-pulse"
                }`}
              onClick={handleIntermediare}
            >
              <div className="w-[50%] h-[90px] flex items-center justify-start">
                <span
                  className="font-teko text-[#E4E5E7] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] 2xl:text-[2rem] 3xl:text-[4rem] transition-colors duration-300"
                  style={{ textShadow: "3px 5px 25px #E79BA5" }}
                >
                  Intermediate
                </span>
              </div>

              <div
                className={`w-[40%] h-[90px] flex items-center justify-center transition-opacity duration-300 ${
                  inrermediare ? "opacity-100" : "opacity-50"
                }`}
              >
                <Image src={Intermediare} alt="Intermediare" width={130} />
              </div>
            </button>
            <button
              className={`w-full 2xl:h-[110px] h-[100px]  flex flex-row items-center justify-center rounded-3xl bg-opacity-10 gap-2 
            ${
              advenced
                ? "bg-[#FFCC80] hover:animate-pulse"
                : "bg-[#606060] hover:animate-pulse"
            }`}
              onClick={handleAdvenced}
            >
              <div
                className={`w-[50%] h-[90px] flex items-center justify-start `}
              >
                <span
                  className="font-teko text-[#E4E5E7] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] 2xl:text-[2rem] 3xl:text-[4rem] transition-colors duration-300"
                  style={{ textShadow: "3px 5px 25px #FFCC80" }}
                >
                  Advanced
                </span>
              </div>

              <div
                className={`w-[40%] h-[90px] flex items-center justify-center transition-opacity duration-300 ${
                  advenced ? "opacity-100" : "opacity-50"
                }`}
              >
                <Image src={Advanced} alt="Advanced" width={130} />
              </div>
            </button>
          </div>
          <div className="w-[80%] 2xl:w-[80%]  xl:w-[60%] lg:w-[60%] md:w-[60%] 2xl:h-full xl:h-[40%] lg:h-[40%] md:h-[40%] h-[40%] flex flex-col items-center justify-start gap-6 ">
            <div className="w-full 2xl:h-[110px] flex items-center justify-start  font-teko text-[#FFFFFF] text-[2rem] md:text-[3rem] lg:text-[3rem] 2xl:text-[3rem] ">
              Mode
            </div>
            <div className="w-full xl:h-[100px] lg:h-[100px] md:h-[100px] 2xl:h-[110px] h-[100px] flex flex-row items-center justify-start space-x-4 sm:space-x-8 md:space-x-10 lg:space-x-12 xl:space-x-16 2xl:space-x-16 ">
              <button
                className={`w-[45%] xl:h-[100px] lg:h-[100px] md:h-[100px] 2xl:h-[110px] h-[80px] flex flex-row items-center justify-center rounded-3xl bg-[#606060] bg-opacity-10 gap-2  
            ${time ? "bg-red-500" : "bg-[#606060]"}`}
                onClick={handleTime}
              >
                <div className="w-[50%] 2xl:h-[90px] flex items-center justify-start ">
                  <span
                    className="font-teko text-[#E4E5E7] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] 2xl:text-[2rem] 3xl:text-[4rem]"
                    style={{ textShadow: "3px 5px 25px #D2386D" }}
                  >
                    Time
                  </span>
                </div>

                <div className="w-[40%] 2xl:h-[90px] flex items-center justify-center ">
                  <Image src={Time} alt="time" width={60} />
                </div>
              </button>
              <button
                className={`w-[45%] xl:h-[100px]  lg:h-[100px] md:h-[100px] 2xl:h-[110px] h-[80px] flex flex-row items-center justify-center rounded-3xl bg-[#606060] bg-opacity-10 gap-2 
            ${defi ? "bg-red-500" : "bg-[#606060]"}`}
                onClick={handleDefi}
              >
                <div className="w-[50%] 2xl:h-[90px] flex items-center justify-start ">
                  <span
                    className="font-teko text-[#E4E5E7] text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] 2xl:text-[2rem] 3xl:text-[4rem]"
                    style={{ textShadow: "3px 5px 25px #D2386D" }}
                  >
                    Defi
                  </span>
                </div>

                <div className="w-[40%] 2xl:h-[90px] flex items-center justify-center ">
                  <Image src={Defi} alt="defi" width={70} />
                </div>
              </button>
            </div>
            <div className="w-full 2xl:h-[110px] h-[100px] md:h-[100px] flex items-center justify-center">
              <PrimaryButton text="Play" onClick={handleOpen} />
              {userData && (userData as userType).userName === name ? (
                <>
                  <Dialog
                    className=" bg-CarbonGrey bg-opacity-30 h-[400px] w-[200px]"
                    open={open}
                    handler={handleOpen}
                  >
                    <DialogHeader className=" text-GreenishYellow font-teko flex items-center justify-center text-[2rem] ">
                      Matching Queye
                    </DialogHeader>
                    <DialogBody className="h-[250px]" divider>
                      <div className="w-full flex flex-row items-start justify-center ">
                        <div className="w-[40%] h-[200px]  flex  items-center justify-center flex-row ">
                          <div
                            className="3xl:w-[30%] 2xl:w-[40%] xl:w-full lg:w-full h-[80%] flex items-center justify-center tooltip  "
                            data-tip={`${Game.userName}  ${Game.level}`}
                          >
                            <img
                              src={Game.image}
                              alt="profile picture"
                              className="  2xl:w-16  h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
                            />
                          </div>
                        </div>
                        <div className="w-[20%] h-[200px] flex items-center justify-center font-teko text-[5rem] text-GreenishYellow ">
                          vs
                        </div>
                        <div className="w-[40%] h-[200px] flex flex-row  items-center justify-center">
                          {isFindingPlayer ? (
                            <div className="spinner">Loading...</div>
                          ) : (
                            <div
                              className="3xl:w-[30%] 2xl:w-[40%] xl:w-full lg:w-full h-[80%] flex items-center justify-center tooltip"
                              data-tip={`${Game.userName}  ${Game.level}`}
                            >
                              <img
                                src={Game.image}
                                alt="profile picture"
                                className="2xl:w-16 h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="green"
                        onClick={handlePlay}
                      >
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </>
              ) : (
                <>
                  <Dialog
                    className=" bg-CarbonGrey bg-opacity-30 h-[400px] w-[200px]"
                    open={open}
                    handler={handleOpen}
                  >
                    <DialogHeader className=" text-GreenishYellow font-teko flex items-center justify-center text-[2rem] ">
                      Friends
                    </DialogHeader>
                    <DialogBody className="h-[250px]" divider>
                      <div className="w-full flex flex-row items-start justify-center ">
                        <div className="w-[40%] h-[200px]  flex  items-center justify-center flex-row ">
                          <div
                            className="3xl:w-[30%] 2xl:w-[40%] xl:w-full lg:w-full h-[80%] flex items-center justify-center tooltip  "
                            data-tip={`${Game.userName}  ${Game.level}`}
                          >
                            <img
                              src={Game.image}
                              alt="profile picture"
                              className="  2xl:w-16  h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
                            />
                          </div>
                        </div>
                        <div className="w-[20%] h-[200px] flex items-center justify-center font-teko text-[5rem] text-GreenishYellow ">
                          vs
                        </div>
                        <div className="w-[40%] h-[200px] flex flex-row  items-center justify-center ">
                          <div
                            className="3xl:w-[30%] 2xl:w-[40%] xl:w-full lg:w-full h-[80%] flex items-center justify-center tooltip  "
                            data-tip={`${Game.userName}  ${Game.level}`}
                          >
                            <img
                              src={Game.image}
                              alt="profile picture"
                              className="  2xl:w-16  h-12 md:h-16 rounded-[12px] md:rounded-[20px]"
                            />
                          </div>
                        </div>
                      </div>
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="green"
                        onClick={handlePlay}
                      >
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option;
