import { withIronSessionSsr } from "iron-session/next";
import { api } from "@/components/axios/instance";
import { userAtom } from "@/context/RecoilAtoms";
import { useRecoilState } from 'recoil';
import ProfileComponent from "@/components/profile/profileComponent";
import "../../app/globals.css";
import { useEffect } from "react";
import userType from "@/types/userType";

export default function Profile(props : {data  : userType})
{
	const [user, setUser] = useRecoilState(userAtom);
	setUser((props.data as any).user);
	console.log('user data - ', props.data);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
        <ProfileComponent />
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params } : any) {
	  try {
		console.log('Session : ', req.session);
		const token = await req.session.token.token;
		const { id } = params;

      const res = await api.get(`/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
	  console.log(res.data);
      return {
        props: { data: res.data },
      };
    } catch (error)
	{
		return {
			redirect: {
			destination: '/login',
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
