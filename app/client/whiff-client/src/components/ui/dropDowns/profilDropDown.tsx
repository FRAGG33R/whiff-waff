import React from "react";
import { MenuItem, Typography } from "@material-tailwind/react";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { IconUserCircle } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import Logout from "../../../../public/🦆 iconLogout_.svg";
import Image from "next/image";
import { useState } from "react";
import { itemVariants } from "@/types/framerVariants";
import axios from "axios";
import { useRouter } from "next/router";
import { loggedUserType, userType } from "@/types/userType";
import { useRecoilState } from "recoil";
import { loggedUserAtom, userAtom } from "@/context/RecoilAtoms";
import { localApi } from "@/components/axios/instance";
import { useSocket } from "@/context/socket";

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedUser] = useRecoilState(loggedUserAtom);
  const router = useRouter();
  const s = useSocket();

  const LogOut = async () => {
    localStorage.removeItem("token");
    try {
      (s as any).disconnect();
      
      const res = await localApi.delete("/saveToken");
      router.push("/login");
    } catch (err) {
		router.push("/login");
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className=" flex w-12"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 md:w-12 h-10 cursor-pointer"
      >
        <IconChevronDown stroke={2.5} size={30} color="#CBFC01" />
      </motion.div>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          padding: "0.5rem",
        }}
        className="bg-HokiCl border-0 w-40 z-10 absolute top-[4rem] sm:top-[4.5rem] md:top-[6rem] right-[1.2rem] md:right-10"
      >
        <motion.li variants={itemVariants} className="rounded-lg  flex justify-center items-center">
          <button
            onClick={() => {
              router.push(
                `/profile/${(loggedUser as loggedUserType).userName}`
              );
              if (router.pathname === `/profile/[id]`) router.reload();
            }}
            className="flex flex-row space-y-1 items-center gap-2   w-full h-9 hover:bg-DeepRose rounded-lg hover:text-DeepRose"
          >
            <IconUserCircle
              size={22}
              color="#CBFC01"
              className=" flex items-center justify-center ml-3"
            />
            <Typography variant="h1" className="font-teko text-xl text-Mercury  ">
              My Profile
            </Typography>
          </button>
        </motion.li>
        <motion.li variants={itemVariants} className="rounded-lg  flex justify-center items-center">
          <button
            onClick={() => {
              router.push("/settings");
            }}
            className="flex flex-row space-y-1 items-center gap-2   w-full h-9 hover:bg-DeepRose rounded-lg hover:text-DeepRose"
          >
            <IconSettings
              size={22}
              color="#CBFC01"
              className=" flex items-center justify-center ml-3"
            />
            <Typography variant="h1" className="font-teko text-xl text-Mercury  ">
              Edit Profile
            </Typography>
          </button>
        </motion.li>
        <motion.li variants={itemVariants}>
          <hr className="my-2 border-GreenishYellow " />
          <button
            onClick={LogOut}
            className="flex flex-row space-y-1 items-center gap-2   w-full h-9 hover:bg-DeepRose rounded-lg hover:text-DeepRose"
          >
            <Image src={Logout} alt="logout" width={18} className=" flex items-center justify-center ml-3"/>
            <Typography
              variant="h1"
              className="font-teko text-xl text-Mercury "
            >
              Log Out
            </Typography>
          </button>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default ProfileDropDown;
