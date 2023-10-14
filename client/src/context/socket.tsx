import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import io from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { parseJwt } from "@/lib/jwtToken";
import { useRecoilState } from "recoil";
import { dataGameAtom } from "./RecoilAtoms";
import { Button } from "@material-tailwind/react";
import { duration } from "@mui/material";
export const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<any>(null);
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [data, setData] = useRecoilState(dataGameAtom);
  
  const handltoast = () => {
    router.push("/game/" + userName);
  };

  useEffect(() => {
    if (socket !== null)
      return ;
    const newSocket = io("http://e3r10p16.1337.ma:8887/", {
      extraHeaders: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    newSocket.on(
      "notification",
      function (data: {
        username: string;
        map: string;
        mode: string;
        type: string;
        inviter: string;
      }) {
        toast.success(
          <button
            className="cursror-pointer"
            onClick={() => {
              setData({
                map: data.map,
                mode: data.mode,
                type: "friend",
                inviter: data.inviter,
                username: data.username,
              });
              router.push("/game/" + data.inviter);
            }}
          >
            {data.inviter} challanges you to a GAME
          </button>,
          {
            duration: 10000,
            style: {
              borderRadius: "12px",
              padding: "12px",
              background: "#6C7FA7",
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: "18px",
            },
          }
        );
      }
    );
    setSocket((prev: any) => newSocket);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
      <Toaster position="top-right" />
    </SocketContext.Provider>
  );
};
