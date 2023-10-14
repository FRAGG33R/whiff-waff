import React, { useState } from "react";
import { IconUserPlus } from "@tabler/icons-react";
import searchIcon from "../../../public/searchIcon.svg";
import Image from "next/image";
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import SearchInput from "../ui/inputs/searchInput";
import PrimaryButton from "../ui/buttons/primaryButton";
import { motion } from "framer-motion";
import UserInput from "../ui/inputs/userInput";
import { KeyboardEvent } from "react";
import { api } from "../axios/instance";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { channelType } from "@/types/chatType";

const InviteUser = (props : {selectedChannel : channelType}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const router = useRouter();

  const handleInvite = async () => {
	if (user.length < 1) {
	  toast.error("Username must be at least 1 characters", {
		style: {
		  borderRadius: "12px",
		  padding: "12px",
		  background: "#6C7FA7",
		  color: "#fff",
		  fontFamily: "Poppins",
		  fontSize: "18px",
		},
	  });
	  return ;
	}
	const req = {
		userName : user,
		channelId: props.selectedChannel.roomChat.id,
	};
	try {
	  const res = await api.post("/chat/room/invite", req, {
		headers: {
		  Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	  });
	} catch (err: any) {
	  toast.error(err.response.data.message, {
		style: {
		  borderRadius: "12px",
		  padding: "12px",
		  background: "#6C7FA7",
		  color: "#fff",
		  fontFamily: "Poppins",
		  fontSize: "18px",
		},
	  });
	}
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
		handleInvite();
    }
  };
  const handleOpen = () => setOpen(!open);

  return (
    <div className="min-w-1 flex flex-row gap-2">
	  <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
        className="w-10 xl:w-14 h-10 xl:h-14 rounded-[12px] flex items-center justify-center bg-[#606060]/[12%] cursor-pointer"
      >
        <IconUserPlus className="w-5 xl:w-8 h-5 xl:h-8" />
      </motion.div>
      <Dialog
        className="bg-RhinoBlue h-[300px] w-[200px] rounded-[20px]"
        open={open}
        handler={handleOpen}
        size="xs"
      >
        <Toaster position="top-right" />
        <DialogHeader className="text-Mercury font-teko flex items-center justify-center gap-3 ">
          <IconUserPlus className="w-[6%] h-[6%]" />
          <div className=" 2xl:w-[80%] flex items-center justify-start font-teko font-semibold  text-3xl text-Mercury ">
            {" "}
            Add User
          </div>
        </DialogHeader>
        <DialogBody className="h-[200px] flex flex-col justify-center items-center space-y-4">
			<div className="min-w-1 flex items-center justify-center">
			<UserInput
				handleKeyDown={handleKeyDown}
				placeholder="*********"
				type="text"
				label="Username"
				lableColor="bg-RhinoBlue"
				width="xl"
				regExp={/^.{1,}$/}
				isError={userNameError}
				isDisabled={false}
				value={user}
				setError={setUserNameError}
				setValue={setUser}
				/>
			</div>
            <PrimaryButton text="Invite" onClick={handleInvite} />
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default InviteUser;
