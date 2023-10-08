import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner
  } from "@material-tailwind/react";
import { useState } from "react";
import { loggedUserAtom } from "@/context/RecoilAtoms";
import { userType } from "./../../types/userType";
import { useRecoilState } from "recoil";
import { userDataAtom } from "@/atom/atomStateuser";
import { useRouter } from "next/router";
import { Socket } from 'socket.io-client';
import { log } from 'console';

const ModelGame = ({socket, open, setOpen}: {socket: any, open: boolean, setOpen: any}) => {
    const [Game] = useState({
        userName: "Houssam",
        userName1: "Aissam",
        level: 12,
        level1: 2,
        image:
          "https://cdn.intra.42.fr/users/e91ca4bc18567a537339d354852ecce1/hlalouli.jpg",
      });
      const router = useRouter();
    const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
    const [userData, setUserData] = useRecoilState(userDataAtom);
    const [isFindingPlayer, setIsFindingPlayer] = useState(true);
    const name = router.query.gameId;
    const handleOpen = () => {
        setOpen(!open);
      };
    const handleCancle = () => {
        router.push("/profile/" + (loggedUser as userType).userName);
        setOpen(false);
    }
  return (
    <div>
          {userData && (loggedUser as userType).userName === name ? (
                <>
                  <Dialog
                    className=" bg-CarbonGrey bg-opacity-30 h-[400px] w-[200px]"
                    open={open}
                    handler={function () {}}
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
                              className="  2xl:w-20  h-12 md:h-20 rounded-[12px] md:rounded-[20px]"
                            />
                          </div>
                        </div>
                        <div className="w-[20%] h-[200px] flex items-center justify-center font-teko text-[5rem] text-GreenishYellow ">
                          vs
                        </div>
                        <div className="w-[40%] h-[200px] flex flex-row  items-center justify-center">
                          {isFindingPlayer ? (
                            <div className="text-GreenishYellow  font-teko text-[2rem]">waiting...
                            <Spinner color="indigo" className="h-20 w-20 " />
                            
                            </div>
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
                        onClick={handleCancle }
                        className="mr-1 border-[1px] rounded-[20px] border-CarbonGrey"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="blue-gray"
                        onClick={handleOpen}
                        className="rounded-[20px]"
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
                    handler={function () {}}
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
                        onClick={handleCancle }
                        className="mr-1 border-[1px] rounded-[20px] border-CarbonGrey"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="blue-gray"
                        onClick={handleOpen}
                        className="rounded-[20px]"
                      >
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </>
              )}
    </div>
  )
}

export default ModelGame