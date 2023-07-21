import WaveIcon from '../../../../public/waveImage.svg'
import Image from 'next/image'

export default function Wave() {

	return (
		<Image src={WaveIcon} alt="Wave Icon" className="fixed bottom-0 xl:buttom-6 2xl:-bottom-16 3xl:-buttom-0 left-0  w-full" />
	)
}