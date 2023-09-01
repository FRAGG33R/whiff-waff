import React from "react";
import Image from "next/image";
import FriendGame from "./friendGame";
import { Pagination } from "../ui/pagination/pagination";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDataAtom} from "../../atom/atomStateuser";
import { userType } from "./../../types/userType";

import { friendDataAtom} from "../../atom/atomStateFriend";
import { FriendsProps, User, UserData, UserFriend } from "./../../types/userFriendType";
import axios from "axios";
import { IconFriendsOff } from "@tabler/icons-react";
const friendsComponent = () => {
  const [active, setActive] = useState(1);
  const [friendData, setFriendData] = useRecoilState(friendDataAtom);
  const [friendState, setFriendState] = useState<User[]>(friendData as User[]);
  const [user, setUser] = useRecoilState(userDataAtom);
  const [userState, setUserState] = useState<userType>(user as userType);


  useEffect(() => {
      setFriendState(friendData as User[]);
  }, [friendData]);

  const fetchFriendData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`http://34.173.232.127/api/v1/users/friends?page=${active -1}&elementsNumber=${7}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = userState.userName;
      const accepted = res.data.acceptedFriends;
      const filteredAccepted = accepted
        .filter(
          (friend:any) => friend.receiver.userName === userId
        )
        .map((friends:any) => friends.sender);
        setFriendData(filteredAccepted );
        setFriendState(filteredAccepted);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFriendData();
  }, [active]);
  return (
    <div className="w-full h-[90%] flex items-center rounded-[12px] md:rounded-[20px]  ">
      <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10 " >
      <div className="w-full h-[80%] flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-start space-y-10 ">
      {friendState.length === 0 ? (
      <div className="flex items-center justify-center">
       <IconFriendsOff className="w-8 md:w-16 h-8 md:h-16"/>
      </div>
    ) : (Array.isArray(friendState) &&
       friendState.map((request, index) => (
        <FriendGame friends={request} key={index} AcceptedFriends={friendState} setAcceptedFriends={setFriendState} />
      )))}
    </div>

        <Pagination max={Math.ceil((friendState as any).elementsNumber /7)} active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default friendsComponent;
