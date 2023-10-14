import Image from 'next/image';
import rank from '../../../public/rank.svg';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/context/RecoilAtoms';

export default function RankComponent()
{
	const [user, setUser] = useRecoilState(userAtom) as any;
	
	return (
		<div className="w-full h-full flex flex-col bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
			<div className="w-full h-[15%] flex items-center justify-start space-x-2 py-7 md:py-0 px-2 md:px-4 md:pt-3">
				<Image src={rank} alt="rank icon" className='w-7 md:w-10'/>
				<div className='font-semibold font-teko text-2xl md:text-3xl tracking-wide text-Mercury'>RANK</div>
			</div>
			<div className="w-full h-[85%] flex items-center justify-center py-4">
				<Image src={`/${user.stat.rank}.svg`} alt="grandmaster icon" width={0} height={0} className='w-[240px] lg:w-[280px] 2xl:w-[300px] pb-14'/>
			</div>
		</div>
	)
}