
export default function ProgressCounter(props : {progressValue : number}) {
	return (
		<p
		className="bg-transparent text-teko font-bold text-5xl flex items-center justify-center text-GreenishYellow"
	  >
		{`[BUILDING ${props.progressValue}%]`}
	  </p>
	)
}