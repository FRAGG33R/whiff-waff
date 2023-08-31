import React, { useEffect, useRef, useState } from 'react';
import PingPongTable from './pingPong';
import BeginnerUrl from '../../../public/Group 4609.jpg'

interface GameProps {
  map: string;
  mode: string;
}
let tableInstance: PingPongTable | null = null;

const GameComponent: React.FC<GameProps> = ({ map , mode })=> {
  const [wSize, setwSize] = useState<number[]>([0, 0]);
  const myref = useRef<HTMLDivElement>(null);

  const backgroundImageUrl = "../../../public/Group 4609.jpg";
  useEffect(() => {
   
    function handleResize() {
      setwSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", handleResize)
    return () => {
      if (tableInstance) {
        tableInstance.stopRendering();
        tableInstance = null;
      }
    };
  }, []);

  useEffect(() => {
    if (tableInstance != null){
      console.log("**** destroyed");
      tableInstance.stopRendering();
    }
    console.log("map", map);
    tableInstance = new PingPongTable(myref.current!, map, backgroundImageUrl);
    console.log("**%^&*^&*", tableInstance);
  }, [wSize]);

  return <div 
  className='flex items-center justify-center w-full h-full rounded-lg' ref={myref}>
   </div>;
};

export default GameComponent;