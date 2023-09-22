import React, { useState } from "react";
import Image from "next/image";
import ADDCHANNEL from "../../../public/ADDCHANNEL.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Checkbox,
} from "@material-tailwind/react";
import UserInput from "../ui/inputs/settingsInputs";
import { KeyboardEvent } from "react";
const CreateChannel = () => {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [password, setPassword] = useState("");
  const [errorChannel, setErrorChannel] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
    }
  };
  return (
    <div className="w-full flex flex-row gap-2  justify-center xl:justify-start">
      <button
        onClick={handleOpen}
        className="flex items-center justify-start  gap-2"
      >
        <Image
          src={ADDCHANNEL}
          alt="information icon"
          className="w-10 md:w-16 h-full"
        />
        <div className="2xl:w-[80%] 2xl:flex items-center justify-start font-teko font-meduim hidden 2xl:text-3xl 3xl:text-4xl text-[#6C7FA7] text-opacity-50">
          Create new channel
        </div>
      </button>

      <Dialog
        className="bg-RhinoBlue bg-opacity-80 h-[350px]  rounded-[20px] flex items-center justify-center flex-col"
        open={open}
        handler={handleOpen}
        size="xs"
      >
        <DialogBody className="h-[280px] flex flex-col justify-center items-center  gap-6">
          <div className="">
            <UserInput
              handleKeyDown={handleKeyDown}
              placeholder="Channel Name"
              type="text"
              label="Name"
              lableColor="bg-[#212d5e] "
              width="xl"
              regExp={/^[a-zA-Z0-9_.]{3,16}$/}
              isError={errorChannel}
              isDisabled={false}
              value={channelName}
              setError={setErrorChannel}
              setValue={setChannelName}
            />
          </div>
          <div className="">
            <UserInput
              handleKeyDown={handleKeyDown}
              placeholder="*********"
              type="password"
              label="Password"
            lableColor="bg-[#212d5e] "
              width="xl"
              regExp={/^.{6,}$/}
              isError={errorPassword}
              isDisabled={false}
              value={password} 
              setError={setErrorPassword}
              setValue={setPassword}
            />
          </div>
          <div className="w-40 sm:w-52 md:w-52 lg:w-72">
            <div className="form-control">
              <label className="flex flex-row gap-4">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-success border-4 border-GreenishYellow"
                />
                <span className="font-teko text-[1.2rem]">Private Channel</span>
              </label>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className=" gap-4">
          <SecondaryButton text="Cancel" onClick={handleOpen} />
          <PrimaryButton text="Confirm" onClick={handleOpen} />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CreateChannel;
