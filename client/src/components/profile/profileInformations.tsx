export default function ProfileInformations() {
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full h-[80%] flex flex-col md:flex-row border-2 border-red-400">
        <div className="h-[70%] md:h-full w-full md:w-[40%] flex flex-col border-2  border-red-400">

          <div className="w-full h-[80%] border-2 border-red-400">
            profile picture
          </div>
          <div className="w-full h-[20%] border-2 border-red-400">settings</div>
        </div>
		
        <div className="h-[30%] md:h-full w-full md:w-[60%] border-2 border-red-400">Level</div>
      </div>
      <div className="w-full h-[20%] border-2 border-red-400">
        Match statistics
      </div>
    </div>
  );
}
