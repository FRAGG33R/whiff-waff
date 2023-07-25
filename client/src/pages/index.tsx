import "../app/globals.css";
import Room from "@/components/landingPage/room";
import dynamic from "next/dynamic";

// const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
//   ssr: false,
// });

export default function Home() {
  return (
    <main className="flex md:min-h-screen h-screen items-start justify-center overflow-x-hidden bg-[#121A28] overflow-y-hidden">
		{/* <AnimatedCursor
        color="203, 252, 1"
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
      /> */}
		<Room />
    </main>
  );
}
