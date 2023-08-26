import "../app/globals.css";

import FriendsPage from "@/components/friends/friendsPage";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import React, { use, useEffect } from "react";
import { useRecoilState } from "recoil";
import { friendDataAtom } from "../atom/atomStateFriend";
import { pandingDataAtom } from "../atom/atomStatePanding";
import { UserFriend } from "./../types/userFriendType";
import { parseJwtSsr } from "@/lib/jwtTokenSsr";


export default function Friends(props: UserFriend) {
  const [userDataFriend, setUserDataFriend] = useRecoilState(friendDataAtom);
  const [userDataPanding, setUserDataPanding] = useRecoilState(pandingDataAtom);
  console.log("props: ", props);
  setUserDataFriend(props.secondData);
  setUserDataPanding(props.firstData);





  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <FriendsPage />
    </div>
  );
}


export const getServerSideProps = withIronSessionSsr(
  
  async function getServerSideProps({ req }: any) {
    try {
      const token = await req.session.token.token;
      console.log("req.session.token.token: ", req.session.token.token);
      const userId = parseJwtSsr(token).id;
      
 
      

      const res = await axios.get(
        "  http://34.173.232.127/api/v1/users/friends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pending = res.data.acceptedFriends;

      const accepted = res.data.pendingFriends;
      
   
      const filteredPending = pending
        .filter(
          (friend:any) => friend.receiver.id === userId
        )
        .map((friends:any) => friends.sender);

      const filteredAccepted = accepted
        .filter(
          (friends:any) => friends.receiver.id === userId
        )
        .map((friends:any) => friends.sender);
      return {
        props: {
          firstData: filteredPending,
          secondData: filteredAccepted,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  },
  {
    cookieName: "token",
    password: "Lo7s8sidjlsmiwpamsldldl851KWH@#$O852",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
