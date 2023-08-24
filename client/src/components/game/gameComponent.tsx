import React, { useEffect, useRef } from 'react';
import PingPongTable from './pingPong';

const GameComponent: React.FC = () => {
  const myref = useRef<HTMLDivElement>(null);
  let tableInstance: PingPongTable | undefined;
  useEffect(() => {
    const initializeTable = () => {
      tableInstance = new PingPongTable(myref.current!);
      console.log(tableInstance);
    };
    initializeTable();
    return () => {
      if (tableInstance) {
        destroyInstance(tableInstance);
        console.log("destroyed");
        
      }

    };
  }, []);

  const destroyInstance = (instance: PingPongTable) => {
    if (instance) {
      instance.stopRendering();
      // instance.changeSize();
    }

  };

  return <div className='flex items-center justify-center w-full h-full rounded-lg' ref={myref}>
   </div>;
};

export default GameComponent;