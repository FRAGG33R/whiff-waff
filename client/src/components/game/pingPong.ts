
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
  private ballShadow: any;
  private ballShadow1: any;
  private obstacle1: any ;
  private obstacle2: any;
  private obstacle3: any;
  private obstacle4: any;
  private obstacle5: any;
  private obstacle6: any;


  constructor(element: HTMLElement, tableOption: string, UrlTable: string) {
    this.element = element;
    this.engine = Matter.Engine.create({gravity: {x: 0, y: 0}});
    let width = element.getBoundingClientRect().width;
    let height = element.getBoundingClientRect().height;
    const tableBorderThickness = 15;
    this.render = Matter.Render.create({
      element: this.element,
      engine: this.engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "#D2386D"
      },
    });

    Matter.Render.run(this.render);
    this.render.canvas.style.backgroundSize = "cover";
    if (tableOption === 'Beginner') {
      this.initializeElements(width, height, tableBorderThickness, "#E4E5E7", "#D2386D", "#CBFC01");
    } else if (tableOption === 'Intermediate') {
      this.initializeElements(width, height, tableBorderThickness, "#351F60", "#6C7FA7", "#D2386D");
    } else if (tableOption === 'Advanced') {
      this.initializeElements(width, height, tableBorderThickness, "#D2386D", "#351F60", "#E4E5E7");
    } else {
      throw new Error('Invalid table option');
    }
    
  
    
    this.playerMoveControls();
    
    Matter.Engine.run(this.engine);
    

    Matter.Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: this.render.options.width, y: this.render.options.height },
    });
    Matter.Body.applyForce(this.ball, {x: width/2, y: height / 2}, {x: 0.5, y: 1.5})
  }

  private playerMoveControls(): void {
    document.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
      const tableWidth = this.element.getBoundingClientRect().width - 16 ;
      const player2HalfWidth = (this.player2.bounds.max.x - this.player2.bounds.min.x) / 2;
      const minPlayer2X = 16 + player2HalfWidth;
      const maxPlayer2X = tableWidth - player2HalfWidth;
      const clampedX = Math.min(Math.max(mouseX, minPlayer2X), maxPlayer2X);
      Matter.Body.setPosition(this.player2, { x: clampedX, y: this.player2.position.y });
    });
  
    document.addEventListener("keydown", (event) => {
      const key = event.key;
      const playerSpeed = 200; 
      const tableWidth = this.element.getBoundingClientRect().width - 16;
      const player1HalfWidth = (this.player1.bounds.max.x - this.player1.bounds.min.x) / 2;
      const minPlayer1X = 16 + player1HalfWidth;
      const maxPlayer1X = tableWidth - player1HalfWidth;
  
      if (key === "ArrowLeft" && this.player1) {
        const newPos = Math.max(this.player1.position.x - playerSpeed, minPlayer1X);
        Matter.Body.setPosition(this.player1, { x: newPos, y: this.player1.position.y });
      } else if (key === "ArrowRight" && this.player1) {
        const newPos = Math.min(this.player1.position.x + playerSpeed, maxPlayer1X);
        Matter.Body.setPosition(this.player1, { x: newPos, y: this.player1.position.y });
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
  private initializeElements(width: number, height: number, tableBorderThickness: number, PlayersColor: string, tableColor: string, ballColor: string): void {
 
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
        fillStyle: ballColor,
        strokeStyle: "#ffffff",
      },
      restitution: 1,
    });
    const ballShadowRender = {
      fillStyle: PlayersColor,
      opacity: 0.5,
      strokeStyle: PlayersColor, 
      lineWidth: 0.5, 
      blur: 8,
     
    };
    
    this.ballShadow = Matter.Bodies.circle(
      this.ball.position.x,
      this.ball.position.y,
      this.ball.circleRadius,
      {
        isStatic: true,
        isSensor: true,
        render: ballShadowRender,
        label: 'ballShadow',
      }
    );


    Matter.World.add(this.engine.world, [this.ballShadow]);



    Matter.Events.on(this.engine, 'beforeUpdate', () => {
      if (this.ball && this.ball.position) {
        Matter.Body.setPosition(this.ballShadow, { x: this.ball.position.x, y: this.ball.position.y });
      }
    });

    let obstacleWidth: number = width * 0.3;
let obstacleHeight: number = height * 0.1;

// Adjust the obstacle dimensions for smaller screens
if (window.innerWidth < 768) {
  obstacleWidth = width * 0.2;
  obstacleHeight = height * 0.05;
}

// Set the base positions for the obstacles
let obstacle1PosY: number = height / 2 + 300;
let obstacle2PosY: number = height / 2 - 300;
let obstacle3PosX: number = width - tableBorderThickness / 2;
let obstacle3PosY: number = height / 2 - 300;
let obstacle4PosX: number = width - tableBorderThickness / 2;
let obstacle4PosY: number = height / 2 + 300;

// Adjust the obstacle positions for smaller screens
if (window.innerWidth < 768) {
  obstacle1PosY = height / 2 + 200;
  obstacle2PosY = height / 2 - 200;
  obstacle3PosY = height / 2 - 200;
  obstacle4PosY = height / 2 + 200;
}
    

    if (tableColor === "#351F60") {
      this.render.canvas.style.background = tableColor;
      this.obstacle1 = Matter.Bodies.rectangle(
        tableBorderThickness / 2,
        obstacle1PosY,
        obstacleWidth,
        obstacleHeight,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 20 },
        }
      );
      
      this.obstacle2 = Matter.Bodies.rectangle(
        tableBorderThickness / 2,
        obstacle2PosY,
        obstacleWidth,
        obstacleHeight,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 20 },
        }
      );
      
      this.obstacle3 = Matter.Bodies.rectangle(
        obstacle3PosX,
        obstacle3PosY,
        obstacleWidth,
        obstacleHeight,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 50 },
        }
      );
      
      this.obstacle4 = Matter.Bodies.rectangle(
        obstacle4PosX,
        obstacle4PosY,
        obstacleWidth,
        obstacleHeight,
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
    
    if (tableColor === "#6C7FA7") {
      this.obstacle5 = Matter.Bodies.rectangle(
        obstacle3PosX,
        obstacle3PosY,
        obstacleWidth,
        obstacleHeight,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 50 },
        }
      );
      
      this.obstacle6 = Matter.Bodies.rectangle(
        obstacle4PosX,
        obstacle4PosY,
        obstacleWidth,
        obstacleHeight,
        {
          isStatic: true,
          render: {
            fillStyle: PlayersColor,
          },
          chamfer: { radius: 50 },
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