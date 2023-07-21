"use client";

import SignInComponent from "@/components/authentication/signin/signin";
import "../app/globals.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Wave from "@/components/authentication/assets/wave";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Login() {
  const router = useRouter();

  return (
      <div className="flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet overflow-y-hidden">
        <AnimatedCursor
          color="203, 252, 1"
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={1.7}
        />
       <SignInComponent />
	   <Wave />
      </div>
  );
}
