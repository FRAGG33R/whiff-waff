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
import { useRouter } from "next/router";
import "../../app/globals.css";

export default function Profile(props: { data: userType }) {
  const [user, setUser] = useRecoilState(userAtom);
  const [matchHistory, setMatchHistory] = useRecoilState(matchHistoryAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const fetchProfile = async (token: string) => {
    if (router.query.id === undefined) return;
    try {
		setLoaded(false);
      console.log("router.query.id : ", router.query);
      const res = await api.get(`/users/profile/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res : ", res.data.response);
      setMatchHistory((prev) => res.data.response.gamesData);
      setUser((prev) => res.data.response.user);
      setLoggedUser((prev) => res.data.response.loggedUser);
      setLoaded(true);
    } catch (error: any) {
      console.log("error : ", error);
      if (error.response)
		router.push("/404");
      else
		router.push("/login");
    }
  };

  useEffect(() => {
    console.log("router.query.id : ", router.query.id);
	const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    } else {
      fetchProfile(token);
    }
  }, [router.query.id]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      {loaded && <ProfileComponent />}
    </div>
  );
}
