import '@/app/globals.css'
import { IconFileAlert } from '@tabler/icons-react';
import NotFound from '../../public/404.svg';
import PageNot404 from '../../public/404_N.svg';
import PrimaryButton from '@/components/ui/buttons/primaryButton';
import Image from 'next/image';
export default function  PageNotFound()
{
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet flex-col gap-20">
			<div className='w-full text-white text-6xl font-teko flex justify-center items-center flex-row    lg:space-x-16 '>
				<Image src={NotFound} alt='pagenotFound' className='w-[50%] lg:w-[20%]'/>
				<Image src={PageNot404} alt='pagenotFound'  className='w-[50%] lg:w-[20%]' />
			</div>
			<PrimaryButton text="Go Back"  onClick={() => window.history.back()} />
		</div>
	)
}