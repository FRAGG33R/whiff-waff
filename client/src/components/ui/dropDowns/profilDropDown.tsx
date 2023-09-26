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
import { userType } from "@/types/userType";
import { useRecoilState } from "recoil";
import { userAtom } from "@/context/RecoilAtoms";
import { localApi } from "@/components/axios/instance";

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();

  const LogOut = async () => {
    localStorage.removeItem("token");
    try {
      const res = await localApi.delete("/saveToken");
      router.push("/login");
    } catch (err) {
      console.log("Couldn't distroy user session");
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
        <motion.li variants={itemVariants}>
          <MenuItem onClick={() => {router.push(`/profile/${(user as userType).userName}`)}} className="flex flex-row space-y-1 items-center gap-2 h-9 hover:bg-DeepRose hover:text-HokiCl">
            <IconUserCircle
              size={22}
              color="#CBFC01"
              className="flex items-center"
            />
            <Typography 
              variant="h1"
              className="font-teko text-xl text-Mercury "
            >
              My Profile
            </Typography>
          </MenuItem>
        </motion.li>
        <motion.li variants={itemVariants}>
          <MenuItem
            onClick={() => {
              router.push("/settings");
            }}
            className="flex flex-row space-y-1 items-center gap-2 h-9 hover:bg-DeepRose hover:text-HokiCl"
          >
            <IconSettings
              size={22}
              color="#CBFC01"
              className="flex items-center"
            />
            <Typography
              variant="h1"
              className="font-teko text-xl text-Mercury"
            >
              Edit Profile
            </Typography>
          </MenuItem>
        </motion.li>
        <motion.li variants={itemVariants}>
          <hr className="my-2 border-GreenishYellow " />
          <MenuItem
            onClick={LogOut}
            className="flex flex-row -space-y-1 space-x-1 gap-2 h-9 hover:bg-DeepRose hover:text-HokiCl"
          >
            <Image src={Logout} alt="logout" width={18} />
            <Typography
              variant="h1"
              className="font-teko text-xl text-Mercury "
            >
              Log Out
            </Typography>
          </MenuItem>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default ProfileDropDown;
