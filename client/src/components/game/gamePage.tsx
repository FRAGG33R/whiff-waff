import React, { use, useRef } from 'react'
import ScoreGame from './scoreGame'
import Option from './option'
import GameComponent from './gameComponent'

const GamePage = () => {
  const divRef = useRef(null);
  console.log(divRef.current);
  return (
    <div className="w-[98%] h-[96%] md:h-[95%] flex items-center justify-start gap-2 md:gap-10 flex-row overflow-y-hidden">
    <div className="h-full border  min-w-[40px] w-[30px] md:w-[100px]">
      SideBar
    </div>
    <div className="h-full  w-[82%] md:w-[90%] xl:w-[95%] space-y-2 md:space-y-8 ">
      <div className="h-[45px] border  md:h-[50px] lg:h-[60px] xl:h-[70px] w-full">
        NavBar
      </div>
      <div className="w-[99%] md:h-[93%] sm:h-[95%] lg:h-[91.5%] h-[96.5%] overflow-y-scroll xl:overflow-y-auto space-y-2 xl:space-y-10 flex flex-col items-start justify-start  ">
        <div className='w-full h-[140px]  flex  items-center justify-center flex-row gap-2 2xl:bg-blue-gray-600'>
                <ScoreGame/>
        </div>
        <div className='w-full 2xl:h-[1200px]  flex flex-col 2xl:flex-row gap-8 '>
        <div className="w-full 2xl:w-[70%] 2xl:h-full xl:h-[900px] bg-CarbonGrey bg-opacity-10  rounded-xl "
        ref={divRef}>
             <GameComponent/>
            </div>
            <div className="w-full 2xl:w-[30%] 2xl:h-full xl:h-[9
              00px]  bg-CarbonGrey bg-opacity-10  rounded-xl ">
              <Option/>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default GamePage;