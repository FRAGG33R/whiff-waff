import SideBar from "../layout/sideBar";
import NavBar from "../layout/navBar";
import UserBar from "./userBar";
import Conversation from "./conversation";

export default function ChatComponent() {

  return (
    <div className="w-[98%] h-[98%] md:h-[97%] flex items-center justify-start gap-2 md:gap-10 flex-row text-white overflow-y-hidden pt-2">
      <div className="h-full min-w-[60px] w-[60px] md:w-[100px] pt-2">
        <SideBar />
      </div>
      <div className="h-full w-[89%] md:w-full space-y-2 md:space-y-10 pt-2">
        <div className="h-[45px] md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
          <NavBar
            level="0"
            useName="fragger"
            avatar="https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638"
          />
        </div>
        <div className="w-full h-[94%] md:h-[91%] flex flex-row space-x-2 md:space-x-10 overflow-y-hidden overflow-x-hidden">
          <div className="h-full min-w-[60px] max-w-[400px] w-1/4 md:w-1/3 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]"></div>
          <div className="h-full w-full space-y-2 md:space-y-10 flex items-start justify-start flex-col">
            <div className="w-full h-16 md:h-24 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
              <UserBar
                userName="Fragger"
                email="fragger@gmail.com"
                avatar="https://images-ext-1.discordapp.net/external/qYoh4EfH4xvcxE8fNS1clj01IfXfVP6CjPdaDMeEDzU/%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D5360%26q%3D80/https/images.unsplash.com/photo-1672478503001-d6c68cda3d8d?width=1638&height=1638"
              />
            </div>
            <div className="w-full h-[960px] flex itmes-center justify-center py-4 lg:py-10 px-4 lg:px-10 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
              <div className="w-full h-[76%] md:h-full flex flex-col items-center justify-between space-y-2 ">
				<Conversation />
				<div className="h-16 md:h-24 w-full flex items-end justify-center ">
				<input type="text" placeholder="Write a message..." className="input input-ghost w-full h-12 md:h-16 rounded-[12px] md:rounded-[20px] text-md md:text-[1.3rem] tracking-wide text-HokiCl caret-GreenishYellow placeholder:text-HokiCl focus:text-HokiCl bg-[#606060]/[12%] focus:bg-[#606060]/[12%] focus:ring-0 focus:outline-none font-poppins " />
				</div>
			  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
