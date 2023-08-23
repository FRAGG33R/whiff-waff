import React, { useRef, useEffect } from "react";
import { Engine, Render, World, Bodies } from "matter-js";

const PingPongTable: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      element: canvasRef.current!,
      engine: engine,
      options: {
        width: 1400,
        height: 1000,
        background: "#ADE6FE",
        wireframes: false,
        
      }
    });
    
    const tableWidth = 1400;
    const tableHeight = 1000;
    const tableBorderThickness = 20;

    const tableBorderTop = Bodies.rectangle(
      tableWidth / 2,
      tableBorderThickness / 2,
      tableWidth,
      tableBorderThickness,
      {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
      }
    );

    const tableBorderBottom = Bodies.rectangle(
      tableWidth / 2,
      tableHeight - tableBorderThickness / 2,
      tableWidth,
      tableBorderThickness,
      {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
      }
    );

    const tableBorderLeft = Bodies.rectangle(
      tableBorderThickness / 2,
      tableHeight / 2,
      tableBorderThickness,
      tableHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
      }
    );

    const tableBorderRight = Bodies.rectangle(
      tableWidth - tableBorderThickness / 2,
      tableHeight / 2,
      tableBorderThickness,
      tableHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        }
      }
    );

    const rectangle = Bodies.rectangle(100, 300, 30, 100, {
      isStatic: true,
      render: {
        fillStyle: "#3C6A8E",
      },
      chamfer: { radius: 10 }
    });

    const rectangle1 = Bodies.rectangle(1300, 800, 30, 100, {
      isStatic: true,
      render: {
        fillStyle: "#3C6A8E",
      },
      chamfer: { radius: 10 }
    });

    const rectangle2 = Bodies.rectangle(tableWidth / 2, tableHeight / 2, 30, 900, {
      isStatic: true,
      render: {
        fillStyle: "#3C6A8E",
      },
      chamfer: { radius: 10 }
    });

    const ball = Bodies.circle(tableWidth / 2, tableHeight / 2, 20, {
      render: {
        fillStyle: "#3C6A8E",
        strokeStyle: "#3C6A8E"
      }
    });

    World.add(engine.world, [
      tableBorderTop,
      tableBorderBottom,
      tableBorderLeft,
      tableBorderRight,
      rectangle,
      rectangle1,
      rectangle2,
      ball
    ]);

    Engine.run(engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return <div className="flex items-center justify-center w-full h-full rounded-lg" ref={canvasRef} />;
};

export default PingPongTable;