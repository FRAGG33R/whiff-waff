import React, { useEffect, useState } from "react";
import Image from "next/image";
import ADDCHANNEL from "../../../public/ADDCHANNEL.svg";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import UserInput from "../ui/inputs/settingsInputs";
import { KeyboardEvent } from "react";
import { useRouter } from "next/router";
import { api } from "../axios/instance";
import { channelType } from "@/types/chatType";
import { useRecoilState } from "recoil";
import { channelAtom } from "@/context/RecoilAtoms";

const CreateChannel = (props : { selectedChannel : channelType , setSelectedChannel : Function }) => {

  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [password, setPassword] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorChannel, setErrorChannel] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [channel, setChannel] = useRecoilState(channelAtom);
  const router = useRouter();

  const handleOpen = () => setOpen(!open);

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {	
    if (e.key === "Enter") {
		handleCreateChannel();
    }
  };

  const handleCreateChannel = async () => {
	const token = localStorage.getItem("token");
	if (!token)
		router.push("/login");
	else {
		try {
			if (channelName === "") {
				setErrorChannel(true);
				throw new Error("Channel name is required");
			}
			if (password.length > 0 && isPrivate) {
				setErrorPassword(true);
				throw new Error("Private channel can't have password");
			}
			if (password.length < 4 && password.length > 0) {
				setErrorPassword(true);
				throw new Error("Password must be at least 4 characters");
			}
			const req = {
				channelName,
				channelPassword: password,
				channelType : (password.length === 0 && isPrivate) ? "PRIVATE" : (password.length === 0 && !isPrivate) ? "PUBLIC" : "PROTECTED"
			}
			const res = await api.post("/chat/room/join", req, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const newChannel : channelType = {
				roomChat : {
					id : res.data.id,
					name : res.data.name,
				},
				avatars : res.data.avatars,
				message : [],
			}
			setChannel((prev : channelType[]) => [...prev, newChannel]);
			props.setSelectedChannel(newChannel);
			setOpen(false);
		} catch (error : any ) {
			setErrorMessage(error.message);
			setTimeout(() => {
				setErrorMessage("");
				setErrorChannel(false);
				setErrorPassword(false);
			}, 2000);
		}
	}
  };

  useEffect(() => {
	setErrorChannel(false);
	setErrorPassword(false);
	setErrorMessage("");
  }, [open]);

  return (
    <div className="w-full flex flex-row gap-2 justify-center xl:justify-start">
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
        className="bg-RhinoBlue h-[330px] rounded-[20px] flex items-center justify-center flex-col"
        open={open}
        handler={handleOpen}
        size="xs"
      >
        <DialogBody className="create-channel-form h-[200px] md:h-[240px] flex flex-col justify-center items-center gap-6">
          <div >
            <UserInput
              handleKeyDown={handleKeyDown}
              placeholder="Channel Name"
              type="text"
              label="Name *"
              lableColor="bg-RhinoBlue"
              width="xl"
              regExp={/^[a-zA-Z0-9_.]{1,16}$/}
              isError={errorChannel}
              isDisabled={false}
              value={channelName}
              setError={setErrorChannel}
              setValue={setChannelName}
			  />
          </div>
          <div>
		<UserInput
			handleKeyDown={handleKeyDown}
			placeholder="*********"
			type="password"
			label="Password"
			lableColor="bg-RhinoBlue"
			width="xl"
			regExp={/^.{4,}$/}
			isError={errorPassword}
			isDisabled={false}
			value={password} 
			setError={setErrorPassword}
			setValue={setPassword}
			/>
          </div>
			<div className="text-red-500 text-lg -my-4">{errorMessage}</div>
          <div className="w-40 sm:w-52 md:w-52 lg:w-72">
            <div className="form-control">
              <label className="flex flex-row gap-4">
                <input
                  type="checkbox"
				  checked={isPrivate}
				  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="checkbox text-GreenishYellow  border-[3px] border-GreenishYellow"
                />
                <span className="font-teko text-PastelGrey text-[1.2rem]">Private Channel</span>
              </label>
            </div>
          </div>
        </DialogBody>
        <div className="w-[320px] gap-1 px-4 md:gap-4 flex items-center justify-center">
          <SecondaryButton text="Cancel" onClick={handleOpen} />
		<PrimaryButton onKeyDown={handleCreateChannel} text="Confirm" onClick={handleCreateChannel} />
        </div>
      </Dialog>
    </div>
  );
};

export default CreateChannel;
