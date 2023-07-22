import WaveIcon from '../../../../public/waveImage.svg'
import Image from 'next/image'

export default function Wave() {

	return (
		<Image src={WaveIcon} alt="Wave Icon" className="fixed bottom-0 w-full" />
	)
}