import { Engine, Render, World, Bodies } from 'matter-js';

class PingPongTable {
  private engine: any;
  private render: any;
  private player1: any;
  private player2: any;
  private ball: any;

  constructor(elemt: HTMLElement) {
    const width = elemt.getBoundingClientRect().width;
    const height = elemt.getBoundingClientRect().height;
    console.log(width, height);
    const tableWidth = width;
    const tableHeight = height;
    const tableBorderThickness = 20;
    this.engine = Engine.create();

    this.render = Render.create({
      element: elemt,
      engine: this.engine,
      options: {
        width: width,
        height: height,
        background: "#ADE6FE",
        wireframes: false,
        
      },
    });

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
    this.player1 = Bodies.rectangle( 100,  300, 30, 100, {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
        chamfer: { radius: 10 }
      });
    this.player2 = Bodies.rectangle(tableWidth - 100, tableHeight -200, 30, 100, {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
        chamfer: { radius: 10 }
      });

    this.ball = Bodies.circle(tableWidth / 2, tableHeight / 2, 20, {
        render: {
          fillStyle: "#3C6A8E",
          strokeStyle: "#3C6A8E"
        }
      });

      const rectangle2 = Bodies.rectangle(tableWidth / 2, tableHeight / 2, 30, 900, {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
        chamfer: { radius: 10 }
      });

    World.add(this.engine.world, [this.player1, this.player2, this.ball, tableBorderTop, tableBorderBottom, tableBorderLeft, tableBorderRight, rectangle2]);

    Engine.run(this.engine);

    Render.run(this.render);
  }

 public changeSize(){

 }
}

export default PingPongTable;