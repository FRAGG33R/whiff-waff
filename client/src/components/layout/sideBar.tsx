import Image from "next/image";
import GreenishLogo from "../../../public/greenishLogo.svg";
import { navigation } from "@/types/sidebarType";
import { useRouter } from "next/router";

export default function SideBar() {
	const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col md:gap-8  gap-16 bg-[#606060]/[12%] rounded-[20px]">
      <div className="h-[10%] w-full flex items-center justify-center bg-cover">
        <Image src={GreenishLogo} alt="Greenish Logo" />
      </div>
      <div className="h-[90%] w-full flex flex-col items-center">
        <div className="lg:w-full w-1/2 h-full flex flex-col items-center space-y-12 md:space-y-24">
			{navigation.map((item, index) => (
				<button onClick={() => router.push(`/${item.name}`)}>
					<Image src={item.icon} alt={`${item.name} icon`} />
			  </button>
			))}
        </div>
      </div>
    </div>
  );
}
