'use client'

import SignUpComponent from "@/components/authentication/signup/signup";
import dynamic from "next/dynamic";
import Wave from "@/components/authentication/assets/wave";
import "../app/globals.css";
import LogintoggleSwitch from "@/components/ui/buttons/loginToggleSwitch";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Signup() {

  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <AnimatedCursor
          color="203, 252, 1"
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={1.7}
        />
      <div className="h-44 w-44 fixed  top-0  md:right-0 flex items-center md:items-end justify-center md:justify-start ">
        <LogintoggleSwitch
          tab="Signup"
          firstValue="Login"
          secondValue="Signup"
        />
      </div>
      <SignUpComponent />
      <Wave />
    </div>
  );
}
