import Matter, { Engine, Render, World, Bodies , Pair} from 'matter-js';
class PingPongTable {
  private engine: any;
  private render: any;
  private player1: any;
  private player2: any;
  private ball: any;
  private element: HTMLElement;
  private tableBorderLeft: any;
  private tableBorderRight: any;
  private tableBorderTop: any;
  private tableBorderBottom: any;
  private obstacle1: any ;
  private obstacle2: any;
  private obstacle3: any;
  private obstacle4: any;
  private obstacle5: any;
  private obstacle6: any;

  constructor(element: HTMLElement, tableOption: string) {
    this.element = element;
    this.engine = Matter.Engine.create({gravity: {x: 0, y: 0}});
    let width = element.getBoundingClientRect().width;
    let height = element.getBoundingClientRect().height;
    const tableBorderThickness = 15;
    
    if (tableOption === 'Beginner') {
      this.initializeElements(width, height, tableBorderThickness, "#3C6A8E", "#ADE6FE");
    } else if (tableOption === 'Intermediate') {
      this.initializeElements(width, height, tableBorderThickness, "#9D4958", "#ECAAB4");
    } else if (tableOption === 'Advanced') {
      this.initializeElements(width, height, tableBorderThickness, "#9D550A", "#F7C954");
    } else {
      throw new Error('Invalid table option');
    }
    
    
    
    this.playerMoveControls();
    
    Matter.Engine.run(this.engine);
    
    Matter.Render.run(this.render);

    Matter.Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: this.render.options.width, y: this.render.options.height },
    });
    Matter.Body.applyForce(this.ball, {x: width/2, y: height / 2}, {x: 0.2, y: 1.6})
  }

  private playerMoveControls(): void {
    document.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
  
      Matter.Body.setPosition(this.player2, { x: mouseX, y: this.player2.position.y });
    });
  
    document.addEventListener("keydown", (event) => {
      const key = event.key;
      const playerSpeed = 200; 
  
      if (key === "ArrowLeft" && this.player1) {
        Matter.Body.setPosition(this.player1, { x: this.player1.position.x - playerSpeed, y: this.player1.position.y });
      } else if (key === "ArrowRight" && this.player1) {
        Matter.Body.setPosition(this.player1, { x: this.player1.position.x + playerSpeed, y: this.player1.position.y });
      }
    });
  }
  
  public stopRendering(): void {
    Render.stop(this.render);
    World.clear(this.engine.world, false);
    Engine.clear(this.engine);
    this.render.canvas.remove();
    console.log("stop rendering")                                                                                                       
  }

  private initializeElements(width: number, height: number, tableBorderThickness: number, PlayersColor: string, tableColor: string): void {
    this.render = Matter.Render.create({
      element: this.element,
      engine: this.engine,
      options: {
        width: width,
        height: height,
        background: tableColor,
        wireframes: false,
        
      },
    });
  
    this.tableBorderTop = Bodies.rectangle(
      width / 2,
      tableBorderThickness / 2,
      width,
      tableBorderThickness,
      {
        isStatic: true,
        render: {
          fillStyle: PlayersColor,
        },
      }
    );
  
    this.tableBorderBottom = Bodies.rectangle(
      width / 2,
      height - tableBorderThickness / 2,
      width,
      tableBorderThickness,
      {
        isStatic: true,
        render: {
          fillStyle: PlayersColor,
        },
      }
    );
  
    this.tableBorderLeft = Bodies.rectangle(
      tableBorderThickness / 2,
      height / 2,
      tableBorderThickness,
      height,
      {
        isStatic: true,
        render: {
          fillStyle: PlayersColor,
        },
      }
    );
    
    this.tableBorderRight = Bodies.rectangle(
      width - tableBorderThickness / 2,
      height / 2,
      tableBorderThickness,
      height,
      {
        isStatic: true,
        render: {
          fillStyle: PlayersColor,
        },
      }
    );
  
    this.player1 = Bodies.rectangle(
      width / 2,
      height * 0.1,
      width * 0.2,
      height * 0.02,
      {
        isStatic: true,
        render: {
          fillStyle: PlayersColor,
        },
        chamfer: { radius: 10 },
      }
    );
  
    this.player2 = Bodies.rectangle(
      width / 2,
      height * 0.9,
      width * 0.2,
      height * 0.02,
      {
        isStatic: true,
        render: {
          fillStyle: PlayersColor,
        },
        chamfer: { radius: 10 },
      }
    );
  
 
    this.ball = Bodies.circle(width / 2, height / 2, 15, {
      density: 0.1,
      inertia: Infinity,
      friction: 0,
      frictionAir: 0,
      render: {
        fillStyle: PlayersColor,
        strokeStyle: "#ffffff",
      },
      restitution: 1,
    });
  

  
    if (tableColor === "#F7C954") {
      this.obstacle1 = Bodies.rectangle(
        tableBorderThickness / 2,
        height / 2 + 300,
        300,
        100,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 20 },
        }
      );
      this.obstacle3 = Bodies.rectangle(
        tableBorderThickness / 2,
        height / 2 - 300,
        350,
        50,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 20 },
        }
      );
      this.obstacle4 = Bodies.rectangle(
        width - tableBorderThickness / 2,
        height / 2 - 300,
        200,
        100,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 50 },
        }
      );

      this.obstacle2 = Bodies.rectangle(
        width - tableBorderThickness / 2,
        height / 2 + 300,
        400,
        200,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 50 },
        }
      );
  
      Matter.World.add(this.engine.world, [this.obstacle1, this.obstacle2, this.obstacle3, this.obstacle4]);
    }

    if (tableColor === "#ECAAB4"){
      this.obstacle5 = Bodies.rectangle(
        tableBorderThickness / 2,
        height / 2 - 200,
        450,
        100,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 20 },
        }
      );
      this.obstacle6 = Bodies.rectangle(
        width - tableBorderThickness / 2,
        height / 2 + 100,
        500,
        100,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 20 },
        }
      );

      Matter.World.add(this.engine.world, [this.obstacle5, this.obstacle6]);
    }
  
    Matter.World.add(this.engine.world, [
      this.player1,
      this.player2,
      this.ball,
      this.tableBorderLeft,
      this.tableBorderRight,
      this.tableBorderTop,
      this.tableBorderBottom,
    ]);
  }



}

export default PingPongTable;

