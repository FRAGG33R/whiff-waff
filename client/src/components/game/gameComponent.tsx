import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PingPongTable from "./pingPong";
import { io } from "socket.io-client";
import { Body, Vector } from "matter-js";

interface GameProps {
  map: string;
  mode: string;
}
let tableInstance: PingPongTable | null = null;

const GameComponent: React.FC<GameProps> = ({ map, mode }) => {
  const [wSize, setwSize] = useState<number[]>([0, 0]);
  const myref = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<any>();
  const [token, setToken] = useState<string | null>(null);
  // const [theme, setTheme] = useState<number>(0);
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
    function handleResize() {
      setwSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      if (tableInstance) {
        tableInstance.stopRendering();
        tableInstance = null;
      }
    };
  }, []);

  useEffect(() => {
    const socket = io("http://34.173.232.127:3389", {
      extraHeaders: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxNWY4ZWRmLTVkNjAtNDZhMi05MWJhLTA3MTAzMDQ1MDFiOCIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJ1c2VyIjoiSm9obkRvZSIsImlhdCI6MTY5NjYzNTQ4MywiZXhwIjoxNjk3NDk5NDgzfQ.JS7wK6SkfrxmFgjjw6ZVNnAt7VVQDU82B6gW6Q8JarM",
      },
    });
    setSocket(socket);
    if (tableInstance != null) {
      tableInstance.stopRendering();
    }
    tableInstance = new PingPongTable(map, theme, socket, myref.current!);
    socket.on("connect", function () {
      console.log("Connected");
      socket.emit("message", { test: "test" }, (data: any) => {
        console.log(data);
      });
      // socket.emit('notify', {id: '615f8edf-5d60-46a2-91ba-0710304501b8', type: 'hello there'})
    });
    socket.on("exception", function () {
      console.log("Disconnected");
    });

    socket.on("status", () => {
      console.log("online");
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
        console.log(data);
        tableInstance?.update(data);
      }
    );
    socket.on("gameOver", (data: { p1: string; p2: string }) => {
      alert("game over\n p1: " + data.p1 + "\n p2: " + data.p2);
    });
    return () => {
      socket.disconnect();
      tableInstance?.render.canvas.remove();
    };
  }, [wSize]);

  return (
    <div
      className="flex items-center justify-center w-full h-full rounded-lg"
      ref={myref}
    ></div>
  );
};

export default GameComponent;
