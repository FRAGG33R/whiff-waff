import ProfileInformations from "./profileInformations";


export default function ProfileComponent() {
  return (
    <div className="w-full md:w-[98%] h-full md:h-[95%] flex items-center justify-start flex-row  text-white">
      <div className="h-full w-[13%] lg:w-[5%] border-2 border-white">
		sidebar
	  </div>
      <div className="h-full w-full border-2 border-white">
        <div className="h-[7%] w-full border-2 border-white">
			navbar
		</div>
        <div className="h-[93%] w-full border-2 border-white overflow-auto lg:overflow-hidden">
          <div className="w-full h-[60%] lg:h-[35%] flex flex-col lg:flex-row border-2 border-white">
            <div className="w-full lg:w-[55%] h-full border-2 border-white">
				<ProfileInformations />
            </div>
            <div className="w-full lg:w-[45%] h-full border-2 border-white">
              rank
            </div>
          </div>
          <div className="w-full h-full flex flex-col-reverse lg:flex-row border-2 border-white">
            <div className="w-full h-[50%] lg:h-full border-2 border-white">
              match history
            </div>
            <div className="w-full lg:w-7/12  h-[50%] lg:h-full border-2 border-white">
              achievement
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
