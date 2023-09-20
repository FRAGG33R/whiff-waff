import React, { useState } from "react";
import { IconUserPlus } from "@tabler/icons-react";
import searchIcon from "../../../public/searchIcon.svg";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import SearchInput from "../ui/inputs/searchInput";
import PrimaryButton from "../ui/buttons/primaryButton";
const InviteUser = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleInvite = () => {};
  return (
    <div className="w-full flex flex-row  gap-2 ">
      <button
        onClick={handleOpen}
        className="flex items-center justify-start gap-2"
      >
        <IconUserPlus className="w-[90%] 2xl:w-[23%] h-full" />
      </button>
      <Dialog
        className="bg-[#6C7FA7]  h-[300px] w-[200px] rounded-[20px]"
        open={open}
        handler={handleOpen}
        size="xs"
      >
        <DialogHeader className="text-Mercury font-teko flex items-center justify-center gap-3 ">
          <IconUserPlus className="w-[6%] h-[6%]" />
          <div className=" 2xl:w-[80%] flex items-center justify-start font-teko font-semibold  text-3xl text-Mercury ">
            {" "}
            Add User
          </div>
        </DialogHeader>
        <DialogBody className="h-[200px] flex flex-col justify-center items-center ">
          <div className="h-[70px] w-full flex  justify-center items-center">
            <div className="hidden h-full w-[70%]  md:flex flex-row items-center bg-[#606060]  bg-opacity-80 rounded-[12px] md:rounded-[20px]">
              <SearchInput
                onSearch={() => {}}
                placeholder="Search for everything..."
              />
            </div>
            <button
              onClick={() => {
                setOpen((prev) => !prev);
                handleInvite();
              }}
              className="flex h-full min-w-[15%] w-[15%] md:hidden items-center justify-center bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]"
            >
              <Image src={searchIcon} alt="search icon" className="w-5" />
            </button>
          </div>
          <div className="h-[100px] w-full flex  justify-center items-center">
            <PrimaryButton text="Invite" onClick={handleInvite} />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default InviteUser;
