import "../app/globals.css";

import FriendsPage from "@/components/friends/friendsPage";
import { withIronSessionSsr } from "iron-session/next";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { friendDataAtom } from "../atom/atomStateFriend";
import { pandingDataAtom } from "../atom/atomStatePanding";
import { User, UserFriend } from "./../types/userFriendType";
import { parseJwtSsr } from "@/lib/jwtTokenSsr";
import { loggedUserAtom, loggedUserFriendsAtom } from "@/context/RecoilAtoms";
import { userType } from "@/types/userType";
import { api } from "@/components/axios/instance";
import { SocketProvider } from "@/context/socket";

export default function Friends(props: { data: userType; props: UserFriend }) {
  const [userDataFriend, setUserDataFriend] = useRecoilState(friendDataAtom);
  const [userDataPanding, setUserDataPanding] = useRecoilState(pandingDataAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoggedUser((props.data as any).loggedUser);
    setUserDataFriend((props as any).secondData);
    setUserDataPanding((props as any).firstData);
    setLoaded(true);
  },);

  return (
    <SocketProvider >
    <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      {loaded && <FriendsPage />}
    </div>

    </SocketProvider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }: any) {
    try {
      const token = await req.session.token.token;
      const userId = parseJwtSsr(token).id;

      const res = await api.get(
        "/users/friends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const accepted = res.data.response.friends.acceptedFriends;
      const pending = res.data.response.friends.pendingFriends;
      const filteredAccepted = accepted
        .filter((friends: any) => friends.receiver.id === userId)
        .map((friends: any) => friends.sender);
      const filteredPending = pending.map(({ sender, status }: any) => ({
        id: sender.id,
        userName: sender.userName,
        avatar: sender.avatar,
        stat: sender.stat,
      }));
      return {
        props: {
          data: res.data.response,
          firstData: filteredPending,
          secondData: filteredAccepted,
        },
      };
    } catch (error: any) {
      if (error.response)
        return {
          redirect: {
            destination: "/404",
            permanent: false,
          },
        };
      else
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
