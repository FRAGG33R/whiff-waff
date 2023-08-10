// import dynamic from "next/dynamic";
import ProfileComponent from "@/components/profile/profileComponent";
import "../../app/globals.css";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from 'next';
import { api } from "@/components/axios/instance";

// const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
//   ssr: false,
// });

export default function Profile() {
	
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      {/* <AnimatedCursor
        color="203, 252, 1"
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        innerStyle={{ mixBlendMode: "difference" }}
      /> */}
	  <ProfileComponent />
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req } : any) {
		// console.log('hello');
	  const token = await req.session.token.token;
	  console.log('the token is :', token);
	  try {
		const res = await api.get('/users/me', {headers: {
			'Authorization': `Bearer ${token}` 
		}});
		console.log(res.data);
		
	  } catch (error) {
		// console.log(error);
		
	  }

	  return {
		props: {
		},
	  };
	},
	{
	  cookieName: "token",
	  password: "aissamaissamaissamaissamaissamaissamaissamaissamaissamaissamaissam",
	  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	  cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	  },
	},
  );