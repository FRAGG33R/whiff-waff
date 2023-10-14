import ChatComponent from "@/components/chat/chatComponent";
import { withIronSessionSsr } from "iron-session/next";
import { api } from "@/components/axios/instance";
import { useRecoilState } from "recoil";
import { chatAtom, loggedUserAtom } from "@/context/RecoilAtoms";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import { SocketProvider } from "@/context/socket";

export default function Chat(props: { data : any }) {
  const [chat, setChat] = useRecoilState(chatAtom);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setChat(props.data.allConversation);
	setLoggedUser(props.data.loggedUser);
    setLoaded(true);
  });

  return (
    <SocketProvider >
		<div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
		{loaded && <ChatComponent />}
		</div>
    </SocketProvider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }: any) {
    try {
      const token = await req.session.token.token;
      const res = await api.get(`chat/IndividualConversations`, {
		  headers: {
			  Authorization: `Bearer ${token}`,
			},
		});
		const newConv: any[] = res.data.allConversation.filter((item : any) => {
			const user = res.data.blockedUsers.find((user: any) => user.id === item.receiver.id);
			if (user)
				return false;
			return true;
		}
		);
		return ( {
			props : {
				data : {
					allConversation : newConv,
					loggedUser : res.data.loggedUser,
				}
			}
		})
    } catch (error: any) {
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
