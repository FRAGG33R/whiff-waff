"use client";

import SignInComponent from "@/components/authentication/signin/signin";
import Wave from "@/components/authentication/assets/wave";
import dynamic from "next/dynamic";
import "../app/globals.css";
import ToggleSwitch from "@/components/ui/buttons/ToggleSwitch";
import { useRouter } from "next/router";

// const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
//   ssr: false,
// });

export default function Login() {
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
      <SignInComponent />
      <Wave />
    </div>
  );
}
