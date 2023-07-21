import "../app/globals.css";
import Room from "@/components/landingPage/room";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex md:min-h-screen h-screen items-start justify-center overflow-x-hidden bg-black overflow-y-hidden">
      <Room />
    </main>
  );
}
