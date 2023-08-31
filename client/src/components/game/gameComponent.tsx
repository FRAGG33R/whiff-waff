import React, { useEffect, useRef, useState } from 'react';
import PingPongTable from './pingPong';
import { cookies } from 'next/dist/client/components/headers';

let tableInstance: PingPongTable | null = null;

const GameComponent: React.FC = () => {
  const [wSize, setwSize] = useState<number[]>([0, 0]);
  const myref = useRef<HTMLDivElement>(null);
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
    tableInstance = new PingPongTable(myref.current!, "Advanced");
    console.log("**%^&*^&*", tableInstance);
  }, [wSize]);

  return <div className='flex items-center justify-center w-full h-full rounded-lg' ref={myref}>
   </div>;
};

export default GameComponent;