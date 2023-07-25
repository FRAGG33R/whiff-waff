import Image from "next/image"
import GreenishLogo from '../../../public/greenishLogo.svg'

export default function SideBar() {
	return (
		<div className="w-full h-full bg-[#606060]/[12%] rounded-[20px]">
			<div className="h-[10%] w-full flex items-center justify-center bg-cover">
				<Image src={GreenishLogo} alt="Greenish Logo" />
			</div>
			<div className="h-[90%] w-full flex flex-col">
				
			</div>
		</div>
	)
}