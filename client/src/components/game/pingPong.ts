import Matter, { Engine, Render, World, Bodies } from 'matter-js';

class PingPongTable {
  private engine: any;
  private render: any;
  private player1: any;
  private player2: any;
  private rectangle: any;
  private tableBorderTop: any;
  private tableBorderBottom: any;
  private tableBorderLeft: any;
  private tableBorderRight: any;

  private ball: any;

  constructor(elemt: HTMLElement) {
    let width = elemt.getBoundingClientRect().width;
    let height = elemt.getBoundingClientRect().height;

    
    console.log(width, height);
    const tableWidth = width;
    const tableHeight = height;
    const tableBorderThickness = 15;
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

    this.tableBorderTop = Bodies.rectangle(
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
  
    this.tableBorderBottom = Bodies.rectangle(
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
  
     this.tableBorderLeft = Bodies.rectangle(
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
  
      this.tableBorderRight = Bodies.rectangle(
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
      this.player1 = Bodies.rectangle(tableWidth / 2, tableHeight * 0.1, tableWidth * 0.2, tableHeight * 0.02, {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
        chamfer: { radius: 10 },
      });
  
      this.player2 = Bodies.rectangle(tableWidth / 2, tableHeight * 0.9, tableWidth * 0.2, tableHeight * 0.02, {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
        chamfer: { radius: 10 },
      });
  
      this.ball = Bodies.circle(tableWidth / 2, tableHeight / 2, 15   , {
        render: {
          fillStyle: "#3C6A8E",
          strokeStyle: "#3C6A8E",
        },
      });
     

    World.add(this.engine.world, [this.player1, this.player2, this.ball, this.tableBorderTop, this.tableBorderBottom, this.tableBorderLeft, this.tableBorderRight]);

    Engine.run(this.engine);

    Render.run(this.render);
  }
  public stopRendering(): void {
    Render.stop(this.render);
    World.clear(this.engine.world, false);
    Engine.clear(this.engine);
    this.render.canvas.remove();
    this.render.canvas = null;                                                                                                             
  }

}

export default PingPongTable;



  // public changeSize(): void {
  //   const screenWidth = window.innerWidth;

  //   if (screenWidth < 992) {
  //     const angle = Math.PI ; 
  //     console.log("angle", angle);

  //     Matter.Body.rotate(this.player1, angle);

  //     Matter.Body.rotate(this.player2, angle);

  //     Matter.Body.rotate(this.rectangle, angle);
      
  //   } else {
  //     Matter.Body.rotate(this.player1, 0);
  //     Matter.Body.rotate(this.player2, 0);
  //     Matter.Body.rotate(this.rectangle, 0);
  //   }
  // }