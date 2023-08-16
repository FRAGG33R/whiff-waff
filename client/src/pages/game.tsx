import "../app/globals.css";
import GamePage from "@/components/game/gamePage";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Game = () => {
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <GamePage />
    </div>
  )
}

export default Game