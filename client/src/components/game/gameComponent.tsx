import React, { useEffect, useRef } from 'react';
import PingPongTable from './pingPong';

const GameComponent: React.FC = () => {
  const myref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    new PingPongTable(myref.current!);
    return () => {
      
    };
  }, []);
  return <div className='flex items-center justify-center w-full h-full rounded-lg' ref={myref}>
   </div>;
};

export default GameComponent;