import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import toast, { Toaster,  } from "react-hot-toast";
import { Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { parseJwt } from "@/lib/jwtToken";
import { useRecoilState } from "recoil";
import { dataGameAtom } from "./RecoilAtoms";
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
  }
  useEffect(() => {

    const newSocket = io("http://34.173.232.127:443", {
      extraHeaders: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    newSocket.on("notification", function (data: { username: string, map: string, mode: string, type: string, inviter: string}) {
      setUserName(data.inviter);
      setData({map: data.map, mode: data.mode, type: 'friend', inviter: data.inviter, username: data.username});
          toast.success(data.inviter + " challanges you to a GAME", {
        duration: 10000,
        style: {
          borderRadius: "12px",
          padding: "12px",
          background: "#6C7FA7",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "18px",
        },
      })
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}
    <div className="cursor-pointer" onClick={handltoast}>
      <Toaster position="top-right"/>
    </div>
    </SocketContext.Provider>
  );
};
