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
const friendsComponent = () => {
  const [active, setActive] = useState(1);

  const [friendData, setFriendData] = useRecoilState(friendDataAtom);
  const [friendState, setFriendState] = useState<User[]>(friendData as User[]);
  const [user, setUser] = useRecoilState(userDataAtom);
  const [userState, setUserState] = useState<userType>(user as userType);


  useEffect(() => {
    setFriendState(friendData  as User[]);
  }, [friendData]);

  const fetchFriendData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`http://34.173.232.127/api/v1/users/friends?page=${active}&elementsNumber=${7}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res: ", res.data);
      const userId = userState.userName;
      const accepted = res.data.acceptedFriends;
      const filteredAccepted = accepted
        .filter(
          (friend:any) => friend.receiver.userName === userId
        )
        .map((friends:any) => friends.sender);
      setFriendData(res.data.filteredAccepted);
      console.log("FriendData: ", friendData);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("active",active);
    fetchFriendData();
  
  }, [active]);
  return (
    <div className="w-full h-[90%] flex items-center rounded-[12px] md:rounded-[20px]  ">
      <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
      <div className="w-full h-full flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
       {friendState.map((request, index) => (
        <FriendGame friends={request} key={index} />
      ))}
    </div>

        <Pagination max={Math.ceil(5)} active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default friendsComponent;
