export default function ProfileInformations() {
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full h-[80%] flex flex-row border-2 border-red-400">
        <div className="h-full w-[30%] flex flex-col border-2  border-red-400">
          <div className="w-full h-[80%] border-2 border-red-400">
            profile pic
          </div>
          <div className="w-full h-[20%] border-2 border-red-400">settings</div>
        </div>
        <div className="h-full w-[70%] border-2 border-red-400">Level</div>
      </div>
      <div className="w-full h-[20%] border-2 border-red-400">
		match statistics 
	  </div>
    </div>
  );
}
