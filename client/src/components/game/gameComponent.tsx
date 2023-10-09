import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PingPongTable from "./pingPong";
import { io } from "socket.io-client";
import { Body, Vector } from "matter-js";
import ModelGame from "./modelGame";
import Model from "./model";
import { useRecoilState, useResetRecoilState } from "recoil";
import { idAtom, scoreIdAtom, socketAtom } from "@/context/RecoilAtoms";
import toast, { Toaster } from "react-hot-toast";
import { scoreIdType } from "@/types/userType";

interface GameProps {
  map: string;
  mode: string;
  event: string;
}
let tableInstance: PingPongTable | null = null;


const GameComponent: React.FC<GameProps> = ({ map, mode , event}) => {
  const [wSize, setwSize] = useState<number[]>([0, 0]);
  const myref = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<any>();
  const [open, setOpen] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [isFindingPlayer, setIsFindingPlayer] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [msg, setmessage] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [userId, setUserId] = useRecoilState(idAtom);
  const [userScore, setUserScore] = useRecoilState(scoreIdAtom);
  const [globalSocket, setGlobalSocket] = useRecoilState(socketAtom);  
  const [hardsocket, setHardSocket] = useState<any>(globalSocket);
  const router = useRouter();
  
    let theme = 0;
    if (map === "Beginner") {
      theme = 0;
    } else if (map === "Intermediate") {
      theme = 1;
    } else {
      theme = 2;
    }
    const usrId = router.query.gameId;
  useEffect(() => {
  
      
     const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else {
      setToken(token);
    }
    const socket = io("http://e3r10p16.1337.ma:8888", {
      extraHeaders: {
        authorization:
          "Bearer "  + token,
      },
    });
    setSocket(socket);
    socket.on("connect", function () {
      console.log("Connected");
      socket.emit("message", { test: "test" }, (data: any) => {
        console.log(data);
      });
      socket.emit(event, {mode: mode, map: map, type: event, id: usrId})
    });
    socket.on("exception", function () {
      console.log("socket error : " + socket.id);
    });
    socket.on("disconnect", function () {
      console.log("disconnected");
    });
    socket.on("status", () => {
      console.log("online");
    });
    socket.on("start", () => {
      setOpen(false);
    });
    globalSocket.on("notify", () => {
      toast.success("Your opponent has left the game", {
        style: {
          borderRadius: "12px",
          padding: "12px",
          background: "#6C7FA7",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "18px",
        },
      });
    });
    // socket?.on(event, function(data) => {
    //   toast.("", {
    //     style: {
    //       borderRadius: "12px",
    //       padding: "12px",
    //       background: "#6C7FA7",
    //       color: "#fff",
    //       fontFamily: "Poppins",
    //       fontSize: "18px",
    //     },
    // });
    socket.on(
      "update",
      function (data: {
        p1: Vector;
        p2: Vector;
        ball: Vector;
        score1: number;
        score2: number;
      }) {                                                                                    
        tableInstance?.update(data);
        setUserScore({score1: data.score1, score2: data.score2});
      }
      );
    socket.on("left", () => {
     
    })
    socket.on('joined', (data: {username: string}) => {
      setIsFindingPlayer(false);
      setId(data.username);
      setUserId(data.username);
      
    })
    socket.on("gameOver", (data: { msg: string }) => {
      setmessage(data.msg)
      setShowModal(true);
    });
    function handleResize() {
      setwSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", handleResize);
    document.addEventListener('mousemove', (event) => {
      tableInstance?.move(event);
    })
    if (tableInstance)
      tableInstance.socket = socket;
    return () => {
      socket.disconnect();
      if (tableInstance) {
        socket.off("connect");
        socket.off("exception");
        socket.off("status");
        socket.off("update");
        socket.off("gameOver");
      }
    };
  }, []);

  useEffect(() => {
    if (tableInstance != null) {
      tableInstance.stopRendering();
    }
    tableInstance = new PingPongTable(map, theme, socket, myref.current!);
    console.log(socket)
    return () => {
        tableInstance?.stopRendering();
        tableInstance = null;
    }
  }, [wSize, socket]);

  return (
    <div
      className="flex items-center justify-center w-full h-full rounded-lg"
      ref={myref}
    >
      <ModelGame socket={socket} open={open} setOpen={setOpen} event={event} isFindingPlayer={isFindingPlayer} id={id}/>
      <Model showModal={showModal} setShowModal={setShowModal} text={msg}/>
      <Toaster position="top-right" />
    </div>
  );
};

export default GameComponent;
