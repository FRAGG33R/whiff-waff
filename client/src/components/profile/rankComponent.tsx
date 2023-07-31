import { IconBadges } from '@tabler/icons-react';
import Image from 'next/image';
import rank from '../../../public/rank.svg';
import Grandmaster from '../../../public/grandmaster__.svg';

export default function RankComponent()
{
	return (
		<div className="w-full h-full flex flex-col bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
			<div className="w-full h-[15%] flex items-center justify-start space-x-2 px-2 md:px-4 md:pt-3">
				<Image src={rank} alt="rank icon" className='w-7 md:w-10 '/>
				<div className=' font-semibold font-teko text-2xl md:text-3xl tracking-wide '>RANK</div>
			</div>
			<div className="w-full h-[85%] flex items-center justify-center py-4">
				<Image src={Grandmaster} alt="grandmaster icon" className='w-[330px] bg-red-40 lg:w-[500px]  pb-12'/>
			</div>
		</div>
	)
}