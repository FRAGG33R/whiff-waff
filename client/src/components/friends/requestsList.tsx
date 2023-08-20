import React, { useEffect, useState } from "react";
import RequestePage from './Requestepage'
import { useRecoilState } from "recoil";
import { friendDataAtom} from "../../atom/atomStateFriend";
import { FriendsProps, User, UserData, UserFriend } from "./../../types/userFriendType";
import { pandingDataAtom } from "@/atom/atomStatePanding";

const requestsList = () => {

  const [friendData, setFriendData] = useRecoilState(pandingDataAtom);
  const [friendState, setFriendState] = useState<User[]>(friendData as User[]); 
  useEffect(() => {
    setFriendState(friendData as User[]);

  }, [friendData]);

console.log("PandingState", friendState);
  return (
    <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
     {friendState.map((request, index) => (
        <RequestePage req={request} key={index} />
      ))}
    </div>
  );
};

export default requestsList;
