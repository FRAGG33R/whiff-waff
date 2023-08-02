import Image from "next/image";
import { IconSettings } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { matchStatistics } from "@/types/matchStatistics";
import PrimaryButton from "../ui/buttons/primaryButton";
import SecondaryButton from "../ui/buttons/secondaryButton";

export default function ProfileInformations() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
      <div className="w-full h-[80%] flex flex-col md:flex-row ">
        <div className="h-[70%] md:h-full min-w-1  max-w-[25%] md:-space-y-5 xl:space-y-0 flex flex-col">
          <div className="w-full h-[80%] flex items-center justify-center py-8">
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
          <button
            onClick={() => {
              router.push("/settings");
            }}
            className="w-full h-[20%] flex flex-row justify-center  items-center space-x-2 px-2 "
          >
            <IconSettings
              className="w-6 lg:w-8 h-6 lg:h-8"
              color="#6C7FA7"
              stroke={1.5}
            />
            <div className="font-teko font-normal text-xl lg:text-2xl text-HokiCl pt-1 ">
              Edit Profile
            </div>
          </button>
        </div>
        <div className="h-[30%] md:h-full w-full flex flex-col bg-red-400">
			<div className="h-full md:h-[70%] max-w-full flex flex-col space-y-1 md:space-y-2 bg-black">
			<div className="w-full h-full flex items-end font-semibold font-teko text-5xl text-Mercury bg-blue-200 ">Aissam Barchil</div>
			<div className="w-full h-full flex flex-row items-center space-x-6 2xl:space-x-6 ">
				<SecondaryButton text="Connect" onClick={() => {}} />
				<SecondaryButton text="Message" onClick={() => {}} />
				<PrimaryButton text="Challenge" onClick={() => {}} />

			</div>
			<div className="w-full h-full bg-blue-300 "></div>
			</div>
		</div>
      </div>
      <div className="w-full h-[24%] flex flex-row items-center justify-around xl:justify-between xl:px-12 border-t-[3px] border-HokiCl">
        {matchStatistics.map((item, index) => (
          <div
            className={`h-full xl:w-1/5 flex items-center justify-center xl:space-x-8 flex-col lg:flex-row font-normal tracking-wide font-teko  ${
              index === 0 ? "pl-4" : null
            }`}
          >
            <Image
              src={item.avatar}
              alt="total matches"
              className="md:block hidden w-16"
            />
            <div className="min-w-1 min-h-1 w-full flex flex-col md:flex-row lg:flex-col items-start justify-center space-x-0  md:space-x-2 xl:space-x-0 ">
              <div className="text-2xl 2xl:text-3xl 3xl:text-4xl">
                {item.value}
              </div>
              <div className="xl:w-[120px] text-lg 2xl:text-lg 3xl:text-2xl text-HokiCl flex items-center justify-start min-w-1">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
