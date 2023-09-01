import Image from "next/image";
import GreenishLogo from "../../../public/greenishLogo.svg";
import { navigation } from "@/types/sidebarType";
import { useRouter } from "next/router";

export default function SideBar() {
	const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col space-y-10 md:space-y-24 bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
      <div className="h-[10%] w-full flex items-center justify-center bg-cover pt-4">
        <Image src={GreenishLogo} alt="Greenish Logo" className="w-10/12 "/>
      </div>
      <div className="h-[90%] w-full flex flex-col items-center">
        <div className="lg:w-full w-1/2 h-full flex flex-col items-center space-y-12 md:space-y-14">
			{navigation.map((item, index) => (
				<button key={index} onClick={() => router.push(`/${item.name}`)}>
					<Image className="w-6 md:w-8 h-6 md:h-8 text-red-300" src={item.icon} alt={`${item.name} icon`} />
			  </button>
			))}
        </div>
      </div>
    </div>
  );
}
