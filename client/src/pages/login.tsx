"use client";

import SignInComponent from "@/components/authentication/signin/signin";
import Wave from "@/components/authentication/assets/wave";
import dynamic from "next/dynamic";
import "../app/globals.css";
import LogintoggleSwitch from "@/components/ui/buttons/loginToggleSwitch";
import { useRouter } from "next/router";
import { useState } from "react";
import SignUpComponent from "@/components/authentication/signup/signup";

// const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
//   ssr: false,
// });

export default function Login() {
  const [activeTab, setActiveTab] = useState("Login");
  
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-start text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet overflow-y-hidden">
      {/* <AnimatedCursor
        color="203, 252, 1"
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
      /> */}
      <div className="h-44 w-44 fixed  top-0  md:right-0 flex items-center md:items-end justify-center md:justify-start ">
        <LogintoggleSwitch
          tab="Login"
          firstValue="Login"
          secondValue="Signup"
          firstFunction={() => {
            // setActiveTab("Login");
            router.push("/login");
          }}
          secondFunction={() => {
            // setActiveTab("Signup");
            router.push("/signup");
          }}
        />
      </div>
      {
        // activeTab === "Login" ? <SignUpComponent /> : <SignInComponent />
      }
      <SignInComponent />
      <Wave />
    </div>
  );
}
