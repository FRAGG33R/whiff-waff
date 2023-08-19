import "../app/globals.css";

import FriendsPage from "@/components/friends/friendsPage";
import { useRouter } from "next/router";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import React, { use, useEffect } from "react";
import { useRecoilState } from "recoil";
import { friendDataAtom } from "../atom/atomStateFriend";
import { userDataAtom } from "../atom/atomStateuser";
import { userType } from "./../types/userType";
import { FriendsProps, User, UserFriend } from "./../types/userFriendType";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import {parseJwt} from "../lib/jwtToken";
 
export default function Friends(props: UserFriend) {
  const [userDataFriend, setUserDataFriend] = useRecoilState(friendDataAtom);
  const [userDataPanding, setUserDataPanding] = useRecoilState(friendDataAtom);
  setUserDataFriend(props.firstData);
  setUserDataPanding(props.secondData);



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
      console.log("token: ", token);
      const userId = parseJwt(token).user_id;

      const res = await axios.get(
        " http://34.173.232.127/api/v1/users/friends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const filteredDataPanding = res.data.filter((friend: any) => {
        return friend.sender.id === userId;
      }).map((friend: any) => {
        return {
          sender: friend.sender,
          status: friend.status === "panding",
        };
      });
      const filteredDataAccepted = res.data.filter((friend: any) => {
        return friend.sender.id === userId;
      }).map((friend: any) => {
        return {
          sender: friend.sender,
          status: friend.status === "accepted",
        };
      });
      return {
        props: {
          firstData: filteredDataAccepted,
          seconedData: filteredDataPanding,
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
