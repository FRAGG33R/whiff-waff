import HistoryIcon from '../../../public/historyIcon.svg'
import { useState } from 'react'
import Image from 'next/image'
import MatchComponent from './matchComponent'
import { Pagination } from '../ui/pagination/pagination'

export default function MatchComponents()
{
	const [active, setActive] = useState(1);
	return (
		<div className="w-full h-full flex flex-col bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
			<div className="w-full h-[7%]  md:h-[12%] flex flex-row items-center space-x-2 md:space-x-4 px-3 md:px-10 md:py-2  ">
				<Image src={HistoryIcon} alt='match history icon' className='w-7 md:w-10'/>
				<div className='font-semibold font-teko text-2xl md:text-3xl tracking-wide text-Mercury md:pt-1'>GAME HISTORY</div>
			</div>
			<div className="w-full h-[90%] md:h-[95%] flex flex-col items-center justify-start ">
				<div className='w-full min-h-1 flex items-center justify-center flex-col space-y-4'>
					<MatchComponent Mode='Lose'/>
					<MatchComponent Mode='Win'/>
					<MatchComponent Mode='Lose'/>
					<MatchComponent Mode='Lose'/>
					<MatchComponent Mode='Lose'/>
				</div>
				<div className='w-full h-full py-2 flex items-center justify-center '>
					<Pagination max={60} active={active} setActive={setActive}/>
				</div>
			</div>
		</div>
	)
}