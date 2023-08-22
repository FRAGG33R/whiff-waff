import React from "react";
import Beginner from "./../../../public/Beginner.svg";
import Intermediare from "./../../../public/Intermediare.svg";
import Advanced from "./../../../public/Advenced.svg";
import Time from "./../../../public/Time.svg";
import Defi from "./../../../public/Defi.svg";
import PrimaryButton from "../../components/ui/buttons/primaryButton";
import Image from "next/image";
import { useState } from "react";
const Option = () => {
  const [beginner, setBeginner] = useState(false);
  const [inrermediare, setInrermediare] = useState(false);
  const [advenced, setAdvenced] = useState(false);
  const [time, setTime] = useState(false);
  const [defi, setDefi] = useState(false);

  const handleTime =()=>{
    setTime(!time)
    setDefi(false)
  }
  const handleDefi =()=>{
    setDefi(!defi)
    setTime(false)
  }
  const handleBeginner = () => {
    setBeginner(!beginner);
    setInrermediare(false);
    setAdvenced(false);
  };
  const handleIntermediare = () => {
    setInrermediare(!inrermediare);
    setBeginner(false);
    setAdvenced(false);
  };
  const handleAdvenced = () => {
    setAdvenced(!advenced);
    setInrermediare(false);
    setBeginner(false);
  };
  const handlePlay = () => {};
  return (
    <div className="w-full 2xl:h-full flex  flex-col gap-4 md:gap-6  ">
      <div className=" w-full 2xl:h-[120px] flex  flex-col items-center justify-center">
        <div className=" w-full 2xl:h-[100px] flex items-center justify-center font-teko text-[3.5rem] text-[#FFFFFF] border" >
          Option
        </div>
        <div className=" w-[80%] 2xl:h-[5px] xl:h-[8px] flex items-center bg-GreenishYellow justify-center font-teko text-[3rem] border" />
      </div>
      <div className=" w-full 2xl:h-[950px] xl:h-[800px] flex  justify-center ">
        <div className="w-full 2xl:h-full flex  flex-col items-center justify-center gap-6 ">
          <div className="xl:w-[60%] 2xl:w-[80%] 2xl:h-full xl:h-[60%] flex flex-col items-center justify-center gap-6 border">

          <div className="w-full 2xl:h-[100px] flex items-center justify-start  font-teko text-[#FFFFFF] text-[3rem] ">
            Maps
          </div>
          <button
            className={`w-full 2xl:h-[110px] flex flex-row items-center justify-center rounded-3xl bg-opacity-10 gap-2 
          ${beginner? "bg-[#24A6CF]" : "bg-[#606060]"}`}
            onClick={handleBeginner}
          >
            <div className="w-[50%] 2xl:h-[90px] flex items-center justify-start ">
              <span
                className="font-teko text-[#E4E5E7] 2xl:text-[2rem] 3xl:text-[4rem]"
                style={{ textShadow: "3px 5px 25px #24A6CF" }}
              >
                Beginner
              </span>
            </div>

            <div className="w-[40%] 2xl:h-[90px] flex items-center justify-center ">
              <Image src={Beginner} alt="Beginner" width={130} />
            </div>
          </button>
          <button
            className={`w-full h-[110px] flex flex-row items-center justify-center rounded-3xl bg-opacity-10 gap-2 
            ${inrermediare ? "bg-[#E79BA5]" : "bg-[#606060]"}`}
              onClick={handleIntermediare}
            >
            <div className="w-[50%] h-[90px] flex items-center justify-start ">
              <span
                className="font-teko text-[#E4E5E7] 2xl:text-[2rem] 3xl:text-[4rem]"
                style={{ textShadow: "3px 5px 25px #E79BA5" }}
              >
                Intermediate
              </span>
            </div>

            <div className="w-[40%] h-[90px] flex items-center justify-center ">
              <Image src={Intermediare} alt="Intermediare" width={130} />
            </div>
          </button>
          <button
            className={`w-full h-[110px] flex flex-row items-center justify-center rounded-3xl bg-opacity-10 gap-2 
            ${advenced ? "bg-[#FFCC80]" : "bg-[#606060]"}`}
              onClick={handleAdvenced }
            >
            <div className="w-[50%] h-[90px] flex items-center justify-start ">
              <span
                className="font-teko text-[#E4E5E7] 2xl:text-[2rem] 3xl:text-[4rem]"
                style={{ textShadow: "3px 5px 25px #FFCC80" }}
              >
                Advanced
              </span>
            </div>

            <div className="w-[40%] h-[90px] flex items-center justify-center ">
              <Image src={Advanced} alt="Advanced" width={130} />
            </div>
          </button>
          </div>
          <div className="2xl:w-[80%] xl:w-[60%] 2xl:h-full xl:h-[40%] flex flex-col items-center justify-start gap-6 border">

          <div className="w-full 2xl:h-[110px] flex items-center justify-start  font-teko text-[#FFFFFF] text-[3rem] border">
            Mode
          </div>
          <div className="w-full xl:h-[100px] 2xl:h-[110px] flex flex-row items-center justify-start space-x-16 border">
          <button className={`w-[45%] xl:h-[100px] 2xl:h-[110px] flex flex-row items-center justify-center rounded-3xl bg-[#606060] bg-opacity-10 gap-2  
            ${time ? "bg-red-500" : "bg-[#606060]"}`}
              onClick={handleTime}>
              <div className="w-[50%] 2xl:h-[90px] flex items-center justify-start ">
                <span
                  className="font-teko text-[#E4E5E7] 2xl:text-[2rem] 3xl:text-[4rem]"
                  style={{ textShadow: "3px 5px 25px #D2386D" }}
                >
                  Time
                </span>
              </div>

              <div className="w-[40%] 2xl:h-[90px] flex items-center justify-center ">
                <Image src={Time} alt="time" width={60} />
              </div>
            </button>
            <button className={`w-[45%] xl:h-[100px] 
            
            
            
            
            2xl:h-[110px] flex flex-row items-center justify-center rounded-3xl bg-[#606060] bg-opacity-10 gap-2 
            ${defi ? "bg-red-500" : "bg-[#606060]"}`}
              onClick={handleDefi}>
              <div className="w-[50%] 2xl:h-[90px] flex items-center justify-start ">
                <span
                  className="font-teko text-[#E4E5E7] 2xl:text-[2rem] 3xl:text-[4rem]"
                  style={{ textShadow: "3px 5px 25px #D2386D" }}
                >
                  Defi
                </span>
              </div>

              <div className="w-[40%] 2xl:h-[90px] flex items-center justify-center ">
                <Image src={Defi} alt="defi" width={70} />
              </div>
            </button>
          </div>
          <div className="w-full 2xl:h-[110px] flex items-center justify-center border">
            <PrimaryButton text="Play" onClick={handlePlay} />
          </div>
        </div>
          </div>
      </div>
    </div>
  );
};

export default Option;
