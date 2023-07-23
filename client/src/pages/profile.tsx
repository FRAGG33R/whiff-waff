import '../app/globals.css'
import Image from 'next/image'
import kamal from '../../public/kamal.jpg'

export default function Profile()
{
	return (
		<div className="bg-black w-screen h-screen text-7xl flex flex-col items-center justify-center font-bold font-teko text-white">
			<Image src={kamal} alt="Kamal"  width={300} height={300} />
			SKNAHS
		</div>

	)
}