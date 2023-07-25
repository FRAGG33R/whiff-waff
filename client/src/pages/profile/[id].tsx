import Image from "next/image";
import dynamic from "next/dynamic";
import ProfileComponent from "@/components/profile/profileComponent";
import "../../app/globals.css";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Profile() {
	
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
      <AnimatedCursor
        color="203, 252, 1"
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        innerStyle={{ mixBlendMode: "difference" }}
      />
	  <ProfileComponent />
    </div>
  );
}
	