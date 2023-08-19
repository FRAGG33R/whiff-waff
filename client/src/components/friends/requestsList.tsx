import React, { useState } from "react";
import Requestepage from "./Requestepage";
import { useRecoilState } from "recoil";
import { friendDataAtom} from "../../atom/atomStateFriend";
import { FriendsProps, User, UserFriend } from "./../../types/userFriendType";

const requestsList = () => {

  const [friendData, setFriendData] = useRecoilState(friendDataAtom);
  const [friendState, setFriendState] = useState<UserFriend>(friendData as UserFriend);
  const userDataPanding = friendState.secondData;
  console.log("friendData: ", userDataPanding);

  return (
    <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10">
      {userDataPanding.map((request, index) => (
        <Requestepage req={request} key={index} />
      ))}
    </div>
  );
};

export default requestsList;
