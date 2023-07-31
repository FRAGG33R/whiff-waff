import Image from "next/image";
import { IconSettings } from '@tabler/icons-react';
import { useRouter } from "next/router";
import totalWins from "../../../public/totalWins.svg";
import totalMatches from "../../../public/totalMatches.svg";
import totalLoses from "../../../public/totalLoses.svg";
export default function ProfileInformations() {
	const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
      <div className="w-full h-[80%] flex flex-col md:flex-row ">
        <div className="h-[70%] md:h-full w-full md:w-[40%] flex flex-col border-2 border-red-400">
          <div className="w-full h-[80%] flex items-center justify-center border-2 border-red-400 py-16">
            <div className="mask mask-hexagon-2 flex items-center justify-center bg-DeepRose w-[280px] lg:w-[480px] h-32 lg:h-48 rotate-90">
              <div className="mask mask-hexagon-2 w-[92%] h-[92%] bg-white text-black flex items-center justify-center">
                <img
                  alt="profile picture"
                  className="bg-DeepRose w-[130px] lg:w-[200px] -rotate-90"
                  src="https://cdn.intra.42.fr/users/2f44c3084696e9e7c96f6af38c788ebc/kfaouzi.jpg"
                />
              </div>
            </div>
          </div>
          <button onClick={() => {router.push('/settings')}} className="w-full h-[20%] flex flex-row justify-center  items-center space-x-2 px-2 border-2 border-red-400">
			<IconSettings className="w-6 lg:w-8 h-6 lg:h-8" color="#6C7FA7" stroke={1.5} />
			<div className="font-teko font-normal text-xl lg:text-2xl text-HokiCl pt-1 ">Edit Profile</div>
		  </button>
        </div>
        <div className="h-[30%] md:h-full w-full md:w-[60%] border-2 border-red-400">
          Level
        </div>
      </div>
      <div className="w-full h-[20%] flex flex-row items-center space-x-2 2xl:space-x-8 border-2 border-red-400">
        <div className="h-full w-1/3 flex items-center justify-center space-x-2 lg:space-x-6 flex-col lg:flex-row font-normal tracking-wide font-teko  px-0 xl:px-6 ">
			<Image src={totalMatches} alt="total matches" className="md:block hidden pl-0 md:pl-6 3xl:pl-0"/>
			<div className="min-w-1 min-h-1 w-full flex flex-row lg:flex-col items-center justify-center">
				<div className="text-2xl 2xl:text-3xl 3xl:text-4xl">120</div>
				<div className="w-[120px] text-lg 2xl:text-lg 3xl:text-2xl text-HokiCl flex items-center justify-center">Total Matches</div>
			</div>
		</div>
        <div className="h-full w-1/3 flex items-center justify-center space-x-2 lg:space-x-6 flex-col lg:flex-row font-normal tracking-wide font-teko  px-0 xl:px-6 ">
			<Image src={totalWins} alt="total matches" className="md:block hidden pl-0 md:pl-6 3xl:pl-0"/>
			<div className="min-w-1 min-h-1 w-full flex flex-row lg:flex-col items-center justify-center">
				<div className="text-2xl 2xl:text-3xl 3xl:text-4xl">89</div>
				<div className="w-[120px] text-lg 2xl:text-lg 3xl:text-2xl text-HokiCl flex items-center justify-center">Total Wins</div>
			</div>
		</div>
        <div className="h-full w-1/3 flex items-center justify-center space-x-2 lg:space-x-6 flex-col lg:flex-row font-normal tracking-wide font-teko  px-0 xl:px-6 ">
			<Image src={totalLoses} alt="total matches" className="md:block hidden pl-0 md:pl-6 3xl:pl-0"/>
			<div className="min-w-1 min-h-1 w-full flex flex-row lg:flex-col items-center justify-center">
				<div className="text-2xl 2xl:text-3xl 3xl:text-4xl">39</div>
				<div className="w-[120px] text-lg 2xl:text-lg 3xl:text-2xl text-HokiCl flex items-center justify-center">Total Loses</div>
			</div>
		</div>
      </div>
    </div>
  );
}