import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PingPongTable from "./pingPong";
import { io } from "socket.io-client";
import { Body, Vector } from "matter-js";
import { Dialog } from "@material-tailwind/react";
import ModelGame from "./modelGame";
import { Socket } from "dgram";

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
  const router = useRouter();

    let theme = 0;
    if (map === "Beginner") {
      theme = 0;
    } else if (map === "Intermediate") {
      theme = 1;
    } else {
      theme = 2;
    }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else {
      setToken(token);
    }
    const socket = io("http://34.173.232.127:3389", {
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
      socket.emit(event, {mode: mode, map: map})
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
    socket.on(
      "update",
      function (data: {
        p1: Vector;
        p2: Vector;
        ball: Vector;
        score1: number;
        score2: number;
      }) {
        // console.log(data);
        tableInstance?.update(data);
      }
    );
    socket.on("gameOver", (data: { p1: string; p2: string }) => {
      alert("game over\n p1: " + data.p1 + "\n p2: " + data.p2);
    });
    function handleResize() {
      setwSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", handleResize);
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
    return () => {
        tableInstance?.stopRendering();
        tableInstance = null;
    }
  }, [wSize]);

  return (
    <div
      className="flex items-center justify-center w-full h-full rounded-lg"
      ref={myref}
    >
      <ModelGame socket={socket} open={open} setOpen={setOpen}/>
    </div>
  );
};

export default GameComponent;
