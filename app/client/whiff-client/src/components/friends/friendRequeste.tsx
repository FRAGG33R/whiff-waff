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
import { api } from "../axios/instance";
const friendRequeste = (props : {activeTab : number}) => {
  const [active, setActive] = useState(1);
  const [pendingFriends, setPendingFriends] = useRecoilState(pandingDataAtom);
  const [pendingFriendState, setPendingFriendState] = useState<User[]>(pendingFriends as User[]); 
 const [user, setUser] = useRecoilState(userDataAtom);
  const [userState, setUserState] = useState<userType>(user as userType)
  useEffect(() => {
    setPendingFriendState(pendingFriends as User[]);

  }, [pendingFriends]);

  const fetchPandingData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await api.get(`/users/friends?page=${active - 1}&elementsNumber=${7}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = userState.userName;
      const pending = res.data.response.friends.pendingFriends;
      const filteredPending = pending.map(({ sender, status }:any) => ({
        id: sender.id,
        userName: sender.userName,
        avatar: sender.avatar,
        stat: sender.stat
      }));
      setPendingFriendState(filteredPending as User[]);
      setPendingFriends(filteredPending as User[]);

    } catch (error) {
    }
  };
  useEffect(() => {
    fetchPandingData();
  
  }, [active, props.activeTab]);



  return (
    <div className="w-full h-[90%] flex items-center rounded-[12px] md:rounded-[20px]  ">
      <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
      <div className="w-full h-[80%]  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-start space-y-10">
      {pendingFriendState.length === 0 ? (
      <div className="w-full h-full flex items-center justify-center">
        <div>
       <IconFriendsOff className="w-8 md:w-24 h-8 md:h-24"/>
       </div>
      </div>
    ) : (Array.isArray(pendingFriendState) &&
      pendingFriendState.map((request, index) => (
        <RequestePage req={request} key={index} pendingFriends={pendingFriendState} setPendingFriends={setPendingFriendState}/>
      ))
    )}
    </div>
        <Pagination
          max={Math.ceil((pendingFriendState as any).elementsNumber / 7)}
          active={active}
          setActive={setActive}
        />
      </div>
    </div>
  );
};

export default friendRequeste;
