'use client';

import "../app/globals.css";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Login() {
  return (
    <div className="flex md:min-h-screen h-screen items-center justify-center   text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet ">
		<AnimatedCursor
        color="203, 252, 1"
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
      />
    </div>
  );
}
