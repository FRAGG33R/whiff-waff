import React, { useState } from "react";
import Image from "next/image";
import ADDCHANNEL from "../../../public/ADDCHANNEL.svg";
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
  const [error, setError] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
    }
  };
  return (
    <div className="w-full flex flex-row gap-2 ">
      <button
        onClick={handleOpen}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={ADDCHANNEL}
          alt="information icon"
          className="w-[90%] 2xl:w-[20%] h-full "
        />
        <div className="2xl:w-[80%] 2xl:flex items-center justify-start font-teko font-semibold hidden xl:text-4xl text-[#6C7FA7] text-opacity-50">
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
              lableColor="bg-RhinoBlue "
              width="xl"
              regExp={/^[a-zA-Z0-9_.]{3,16}$/}
              isError={error}
              isDisabled={false}
              value={channelName}
              setError={setError}
              setValue={setChannelName}
            />
          </div>
          <div className="">
            <UserInput
              handleKeyDown={handleKeyDown}
              placeholder="*********"
              type="password"
              label="Password"
              lableColor="bg-RhinoBlue "
              width="xl"
              regExp={/^.{6,}$/}
              isError={error}
              isDisabled={false}
              value={password}
              setError={setError}
              setValue={setPassword}
            />
          </div>
          <div className="w-40 sm:w-52 md:w-52 lg:w-72">
            <Checkbox
              label="Private Channel"
              className="border-GreenishYellow "
              color="yellow"
            />
          </div>
        </DialogBody>
        <DialogFooter className=" gap-4">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
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
    </div>
  );
};

export default CreateChannel;
