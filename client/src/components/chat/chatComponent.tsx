import SideBar from "../layout/sideBar";
import NavBar from "../layout/navBar";

export default function ChatComponent() {
  return (
    <div className="w-[98%] h-[96%] md:h-[95%] flex items-center justify-start gap-2 md:gap-10 flex-row text-white overflow-y-hidden pt-2">
      <div className="h-full min-w-[60px] w-[60px] md:w-[100px]">
        <SideBar />
      </div>
      <div className="h-full w-[77%] md:w-[90%] xl:w-[95%] space-y-2 md:space-y-8">
        <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
          <NavBar />
        </div>
        <div className="w-full xl:h-[91%] md:h-[93%] lg:h-[91.5%] h-[91.5%] overflow-y-scroll overflow-x-hidden lg:overflow-y-auto space-y-2 xl:space-y-10 bg-red-400">
			<div className="h-full min-w-[200px] max-w-[400px] w-1/3 bg-blue-300"></div>
		</div>
      </div>
    </div>
  );
}
