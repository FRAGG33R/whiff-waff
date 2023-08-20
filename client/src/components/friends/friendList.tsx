import React from "react";
import FriendGame from "./firendGame"
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { friendDataAtom} from "../../atom/atomStateFriend";
import { FriendsProps, User, UserData, UserFriend } from "./../../types/userFriendType";


const friendList = () => {
  const [friendData, setFriendData] = useRecoilState(friendDataAtom);
  const [friendState, setFriendState] = useState<User[]>(friendData as User[]);
  useEffect(() => {
    setFriendState(friendData  as User[]);

  }, [friendData]);
 console.log("friendDATA", friendState);
  return (
    <div className="w-full h-full flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
       {friendState.map((request, index) => (
        <FriendGame friends={request} key={index} />
      ))}
    </div>
  );
};

export default friendList;