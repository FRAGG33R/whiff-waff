
export default function ProgressCounter(props : {progressValue : number}) {
	return (
		<div
		className="bg-transparent text-teko font-bold text-3xl md:text-5xl flex items-center justify-center text-GreenishYellow"
	  >

		[ <span className="pt-1 px-1">{`BUILDING ${props.progressValue}%`}</span> ]
	  </div>
	)
}