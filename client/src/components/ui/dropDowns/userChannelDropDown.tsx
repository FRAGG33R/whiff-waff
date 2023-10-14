import React from "react";
import { motion } from "framer-motion";
import SettingDrop from "../../../../public/drop.svg";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "@/components/axios/instance";
import { channelUsersType } from "@/types/chatType";

const UserChannelDropDown = (props: {
  userId: string;
  roomId: string;
  channelUsers: channelUsersType[];
  setChannelUsers: Function;
}) => {

  const router = useRouter();

  const handleChangeState = async (state : string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return ;
    }
    const req = {
      userId: props.userId,
      roomId: props.roomId,
      newStatus: state,
    };
    try {
      const res = await api.patch("/chat/room/userStatus", req, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (state === "BANNED") {
        props.setChannelUsers((prev: channelUsersType[]) => {
          const updatedUsers = prev.filter(
            (item: channelUsersType) => item?.user?.id !== props.userId
          );
          return updatedUsers;
        });
      }
	  else if (state === "ADMIN") {
		props.setChannelUsers((prev: channelUsersType[]) => {
		  const updatedUsers = prev.map((item: channelUsersType) => {
			if (item?.user?.id === props.userId) {
			  item.status = "ADMIN";
			}
			return item;
		  });
		  return updatedUsers;
		});
	  }
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
  const handleKick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const req = {
      invitedId: props.userId,
      channelId: props.roomId,
    };
    try {
      const res = await api.post("/chat/room/kick", req, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.setChannelUsers((prev: channelUsersType[]) => {
        const updatedUsers = prev.filter(
          (item: channelUsersType) => item?.user?.id !== props?.userId
        );
        return updatedUsers;
      });
    } catch (error: any) {
    }
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <Toaster position="top-right" />
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 md:w-10 md:h-10 3xl:w-12 3xl:h-12 flex items-center justify-center rounded-[10px] 2xl:rounded-[18px]"
      >
        <Image
          src={SettingDrop}
          alt="dropdown icon"
          className="w-[60%] h-[60%]"
        />
      </motion.div>
      <ul
        tabIndex={0}
        className="dropdown-content text-white z-[99] menu p-2 shadow rounded-box w-44 mt-2 font-poppins font-meduim text-lg bg-HokiCl "
      >
        <li className="">
          <button onClick={handleKick}>Kick</button>
        </li>
        <li>
          <button onClick={() => handleChangeState("BANNED")}>Ban</button>
        </li>
        <li>
          <button onClick={() => handleChangeState("ADMIN")}>
            Set as admin
          </button>
        </li>
      </ul>
    </div>
  );
};
export default UserChannelDropDown;
