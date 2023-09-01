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
          <NavBar
            level="0"
            useName="fragger"
            avatar="https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638"
          />
        </div>
        <div className="w-full xl:h-[91%] md:h-[93%] lg:h-[91.5%] h-[91.5%] flex flex-row space-x-2 md:space-x-10 overflow-y-scroll overflow-x-hidden lg:overflow-y-auto">
          <div className="h-full min-w-[200px] max-w-[400px] w-1/3 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]"></div>
          <div className="h-full w-full space-y-2 md:space-y-10 flex items-start justify-start flex-col">
            <div className="w-full h-24 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]"></div>
            <div className="w-full flex-1 flex itmes-center justify-center py-10 px-10 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
              <div className="w-full h-full "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
