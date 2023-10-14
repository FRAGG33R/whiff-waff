import React from "react";
import { motion } from "framer-motion";
import Silence from "../../../../public/mute.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "@/components/axios/instance";
import toast, { Toaster } from "react-hot-toast";

const MuteDropDown = (props: {
  setMuteDurition: Function;
  userId: string;
  roomId: string;
}) => {
  const router = useRouter();
  const handleMute = async (duration: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const req = {
        userId: props.userId,
        roomId: props.roomId,
        mute: true,
        duration: duration * 60,
      };
      const res = await api.post("/chat/room/mute", req, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <Toaster position="top-right" />
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 md:w-10 md:h-10 3xl:w-12 3xl:h-12 flex items-center justify-center bg-HokiCl/[50%] rounded-[10px] 2xl:rounded-[18px]"
      >
        <Image
          src={Silence}
          alt="information icon"
          className="w-[60%] h-[60%]"
	/>
      </motion.div>
      <ul
        tabIndex={0}
        className="dropdown-content text-white z-[99] menu p-2 shadow rounded-box w-36 mt-2 font-poppins font-meduim text-lg bg-HokiCl "
      >
        <li className="">
          <button onClick={() => handleMute(1)}>1 hour</button>
        </li>
        <li>
          <button onClick={() => handleMute(8)}>8 hours</button>
        </li>
      </ul>
    </div>
  );
};
export default MuteDropDown;
