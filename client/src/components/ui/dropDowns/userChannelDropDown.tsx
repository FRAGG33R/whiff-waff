import React from "react";
import { motion } from "framer-motion";
import SettingDrop from "../../../../public/drop.svg";

import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "@/components/axios/instance";

const UserChannelDropDown = (props : {setMuteDurition : Function, userId : string, roomId : string}) => {
	const router = useRouter();
	const handleMute = async (duration : number) => {
		console.log(duration);
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
			return ;
		}
		try {
			const req = {
				userId: props.userId,
				roomId: props.roomId,
				mute: true,
				duration: (duration * 60),
			};
			console.log('mute Req : ', req);
			const res = await api.post(
				"/chat/room/mute",
				req,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log('mute res : ', res.data);
		} catch (err: any) {
			console.log(err.response.data.message);
		}
	}

  return (
	<div className="dropdown dropdown-bottom dropdown-end">
	<motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 md:w-10 md:h-10 3xl:w-12 3xl:h-12 flex items-center justify-center  rounded-[10px] 2xl:rounded-[18px]"
            >
              <Image
                src={SettingDrop}
                alt="dropdown icon"
                className="w-[60%] h-[60%]"
              />
            </motion.div>
	  <ul
		tabIndex={0}
		className="dropdown-content text-white z-[99] menu p-2 shadow rounded-box w-36 mt-2 font-poppins font-meduim text-lg bg-HokiCl "
	  >
		<li className="">
		  <button onClick={() => handleMute(1)}>ban</button>
		</li>
		<li>
		  <button onClick={() => handleMute(8)}>kick</button>
		</li>
	  </ul>
	</div>
  );
};
export default UserChannelDropDown;
