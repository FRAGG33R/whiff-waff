import ProfileComponent from "@/components/profile/profileComponent";
import "../../app/globals.css";
import { withIronSessionSsr } from "iron-session/next";
import { api } from "@/components/axios/instance";
import { createContext, useContext, useEffect } from "react";
import { userContext } from "@/context/context";

export default function Profile(props: any) {

  useEffect(() => {
    // console.log("state : ", state);.
	console.log(props.data);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <userContext.Provider value={props.data}>
        <ProfileComponent />
      </userContext.Provider>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }: any) {
    try {
      const token = await req.session.token.token;
      console.log("the token is :", token);
      const res = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("- Response :  ", res.data);
      return {
        props: { data: res.data },
      };
    } catch (error) {
      console.log("- Error on fetching profile informations");
      return {
        props: { data: null },
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
