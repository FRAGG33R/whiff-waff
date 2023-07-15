import "../app/globals.css";
import Room from "@/components/landingPage/room";

export default function Home() {
  return (
    <main className="flex md:min-h-screen h-screen items-start justify-center overflow-x-hidden">
		<Room />
    </main>
  );
}
