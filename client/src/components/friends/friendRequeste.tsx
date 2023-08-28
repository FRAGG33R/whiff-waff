import React, { useEffect } from "react";
import { useState } from "react";
import RequestePage from './Requestepage'
import { useRecoilState } from "recoil";
import { friendDataAtom} from "../../atom/atomStateFriend";
import { FriendsProps, User, UserData, UserFriend } from "./../../types/userFriendType";
import { pandingDataAtom } from "@/atom/atomStatePanding";
import { Pagination } from "../ui/pagination/pagination";
import { userDataAtom} from "../../atom/atomStateuser";
import { userType } from "./../../types/userType";
import axios from "axios";
import { IconFriendsOff } from "@tabler/icons-react";
const friendRequeste = () => {
  const [active, setActive] = useState(1);
  const [friendData, setFriendData] = useRecoilState(pandingDataAtom);
  const [friendState, setFriendState] = useState<User[]>(friendData as User[]); 
  const [user, setUser] = useRecoilState(userDataAtom);
  const [userState, setUserState] = useState<userType>(user as userType)
  const [refresh, setRefresh] = useState<number>(0);
  useEffect(() => {
    setFriendState(friendData as User[]);

  }, [friendData]);

  const fetchPandingData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`http://34.173.232.127/api/v1/users/friends?page=${active - 1}&elementsNumber=${7}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = userState.userName;
      const pending = res.data.pendingFriends;
      const filteredPending = pending.map(({ sender, status }:any) => ({
        id: sender.id,
        userName: sender.userName,
        avatar: sender.avatar,
        stat: sender.stat
      }));
      setFriendState(filteredPending as User[]);
      setFriendData(filteredPending as User[]);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPandingData();
  
  }, [active, refresh]);

  const refetch = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="w-full h-[90%] flex items-center rounded-[12px] md:rounded-[20px]  ">
      <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
      <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
      {friendState.length === 0 ? (
      <div className="flex items-center justify-center">
       <IconFriendsOff className="w-8 md:w-16 h-8 md:h-16"/>
      </div>
    ) : (Array.isArray(friendState) &&
      friendState.map((request, index) => (
        <RequestePage req={request} key={index} refetch={refetch} />
      ))
    )}
    </div>
        <Pagination max={Math.ceil((friendState as any).elementsNumber/7)}active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default friendRequeste;
