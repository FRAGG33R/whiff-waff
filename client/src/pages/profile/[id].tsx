import { withIronSessionSsr } from "iron-session/next";
import { api } from "@/components/axios/instance";
import {
  loggedUserAtom,
  matchHistoryAtom,
  userAtom,
} from "@/context/RecoilAtoms";
import { useRecoilState } from "recoil";
import ProfileComponent from "@/components/profile/profileComponent";
import { userType } from "@/types/userType";
import { useEffect, useState } from "react";
import "../../app/globals.css";

export default function Profile(props: { data: userType }) {
  const [user, setUser] = useRecoilState(userAtom);
  const [matchHistory, setMatchHistory] = useRecoilState(matchHistoryAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setMatchHistory((props.data as any).gamesData);
    setUser((props.data as any).user);
    setLoggedUser((props.data as any).loggedUser);
    setLoaded(true);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      {loaded && <ProfileComponent />}
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }: any) {
    try {
      const token = await req.session.token.token;
      const { id } = params;
	const res = await api.get(`/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        props: { data: res.data.response },
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
      secure: process.env.NODE_ENV === "production",
    },
  }
);
