import "../app/globals.css";
import SettingPage from "@/components/settings/settingPage";
import { withIronSessionSsr } from "iron-session/next";
import { useRecoilState } from "recoil";
import { api } from "@/components/axios/instance";
import { loggedUserAtom, userAtom } from "@/context/RecoilAtoms";
import { useEffect, useState } from "react";
import { parseJwtSsr } from "@/lib/jwtTokenSsr";
import { SocketProvider } from "@/context/socket";

export default function Settings(props: { data: any }) {
  const [userData, setUserData] = useRecoilState(userAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
	  setUserData(props.data.response.user);
	  setLoggedUser(props.data.response.loggedUser)
	 setLoaded(true);  
  })
  return (
    <SocketProvider >
    <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      {loaded && <SettingPage />}
    </div>

    </SocketProvider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }: any) {
    try {
      const token = await req.session.token.token;
      const userData = parseJwtSsr(token);
      const res = await api.get(`/users/profile/${userData.user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        props: { data: res.data},
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
