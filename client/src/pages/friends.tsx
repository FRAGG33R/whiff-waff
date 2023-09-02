import "../app/globals.css";

import FriendsPage from "@/components/friends/friendsPage";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import React, { use, useEffect } from "react";
import { useRecoilState } from "recoil";
import { friendDataAtom } from "../atom/atomStateFriend";
import { pandingDataAtom } from "../atom/atomStatePanding";
import { User, UserFriend } from "./../types/userFriendType";
import { parseJwtSsr } from "@/lib/jwtTokenSsr";
import { loggedUserFriendsAtom } from "@/context/RecoilAtoms";
import { userType } from "@/types/userType";


export default function Friends( props: { data: userType ,props: UserFriend }) {
  const [userDataFriend, setUserDataFriend] = useRecoilState(friendDataAtom);
  const [userDataPanding, setUserDataPanding] = useRecoilState(pandingDataAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserFriendsAtom);
  setLoggedUser((props.data as any).loggedUser);
  setUserDataFriend((props as any ).secondData);
  setUserDataPanding((props as any).firstData);
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
      const accepted = res.data.response.friends.acceptedFriends;
      const pending = res.data.response.friends.pendingFriends;
      const filteredAccepted = accepted
        .filter(
          (friends:any) => friends.receiver.id === userId
        )
        .map((friends:any) => friends.sender);
        const filteredPending = pending.map(({ sender, status }:any) => ({
          id: sender.id,
          userName: sender.userName,
          avatar: sender.avatar,
          stat: sender.stat
        }));
      return {
        props: {
          data: res.data.response ,
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
    password:
      "$Kv4v3r6t8b7x5fd2a9c73baa7495d8268b048dc791c301621da7129s3C9g1#2qweIokLKJXx",
    cookieOptions: {
      secure: process.env.ENV === "production",
    },
  }
);
