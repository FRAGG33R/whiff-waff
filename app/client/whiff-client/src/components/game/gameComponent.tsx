import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PingPongTable from "./pingPong";
import { io } from "socket.io-client";
import { Body, Vector } from "matter-js";
import ModelGame from "./modelGame";
import Model from "./model";
import { useRecoilState} from "recoil";
import {
  dataGameAtom,
  idAtom,
  scoreIdAtom,
  socketAtom,
} from "@/context/RecoilAtoms";
import toast, { Toaster } from "react-hot-toast";
import { dataGameType, scoreIdType } from "@/types/userType";
import { useSocket } from "@/context/socket";
import { parseJwt } from "@/lib/jwtToken";

interface GameProps {
  map: string;
  mode: string;
  event: string;
}
let tableInstance: PingPongTable | null = null;

const GameComponent: React.FC<GameProps> = ({ map, mode, event }) => {
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
  const [gameData, setGameData] = useRecoilState(dataGameAtom);

  const router = useRouter();

  const usrId = router.query.gameId;

  const s = useSocket();
  let theme = 0;
  if (map === "Beginner") {
    theme = 0;
  } else if (map === "Intermediate") {
    theme = 1;
  } else {
    theme = 2;
  }
  const userName = parseJwt(localStorage.getItem("token") as any).user;
  useEffect(() => {	
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else {
      setToken(token);
    }
    const socket = io("http://localhost:8888", {
      extraHeaders: {
        authorization: "Bearer " + token,
      },
    });
    setSocket(socket);
    socket.on("connect", function () {
      socket.emit("message", { test: "test" }, (data: any) => {
      });
      socket.emit(event, {
        mode: mode,
        map: map,
        type: (gameData as dataGameType).type,
        id: usrId,
      });
      if (event === "notify" && (gameData as dataGameType).type !== "friend") {
        (s as any).emit("notification", {
          username: usrId,
          inviter: userName,
          map: map,
          mode: mode,
        });
        setId(usrId as string);
        setUserId(usrId as string);
      }
      setGameData({ type: "" });
    });
    socket.on("exception", function () {
    });
    socket.on(event, (data: { username: string }) => {
      setId(data.username);
      setUserId(data.username);
    });
    socket.on("disconnect", function () {
    });
    socket.on("status", () => {
    });

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
        setUserScore({ score1: data.score1, score2: data.score2 });
      }
    );
    socket.on("left", (data: {msg: string}) => {
      setmessage(data.msg);
      setShowModal(true);
    });
    socket.on("joined", (data: { username: string }) => {
      setIsFindingPlayer(false);
      setId(data.username);
      setUserId(data.username);
    });
    socket.on("start", () => {
      setOpen(false);
    });
    socket.on("gameOver", (data: { msg: string }) => {
      setmessage(data.msg);
      setShowModal(true);
    });
    function handleResize() {
      setwSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousemove", (event) => {
      tableInstance?.move(event);
    });
    if (tableInstance) tableInstance.socket = socket;
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
    if ((gameData as dataGameType).type === "friend") {
      map = (gameData as dataGameType).map;
      mode = (gameData as dataGameType).mode;
    }
    tableInstance = new PingPongTable(map, theme, socket, myref.current!);
    return () => {
      tableInstance?.stopRendering();
      tableInstance = null;
    };
  }, [wSize, socket]);

  return (
    <div
      className="flex items-center justify-center w-full h-full rounded-lg"
      ref={myref}
    >
      <ModelGame
        socket={socket}
        open={open}
        setOpen={setOpen}
        event={event}
        isFindingPlayer={isFindingPlayer}
        id={id}
      />
      <Model
        showModal={showModal}
        setShowModal={setShowModal}
        text={msg}
        socket={socket}
      />
      <Toaster position="top-right" />
    </div>
  );
};

export default GameComponent;
