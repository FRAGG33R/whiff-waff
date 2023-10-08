
import Matter, { Engine, Body,Vector} from 'matter-js';
import { useRouter } from 'next/router';
import { Socket,io } from "socket.io-client";
class PingPongTable {
//   engine: Matter.Engine;
//    render: Matter.Render;
//    player1: any;
//    player2: any;
//    ball: any;
//    element: HTMLElement ;
//    tableBorderLeft: any;
//    tableBorderRight: any;
//    tableBorderTop: any;
//    tableBorderBottom: any;
//    ballShadow: any;
//    obstacle1: any;
//    obstacle2: any;
//    obstacle3: any;
//    obstacle4: any;
//    obstacle5: any;
//    obstacle6: any;


//   constructor(element: HTMLElement, tableOption: string) {
//     this.element = element;
//     this.engine = Matter.Engine.create({gravity: {x: 0, y: 0}});
//     let width = element.getBoundingClientRect().width;
//     let height = element.getBoundingClientRect().height;
//     const tableBorderThickness = 15;
//     this.render = Matter.Render.create({
//       element: this.element,
//       engine: this.engine,
//       options: {
//         width: width,
//         height: height,
//         wireframes: false,
//         background: "#D2386D"
//       },
//     });
    
//     Matter.Render.run(this.render);
//     this.render.canvas.style.backgroundSize = "cover";
//     if (tableOption === 'Beginner') {
//       this.initializeElements(width, height, tableBorderThickness, "#E4E5E7", "#D2386D", "#CBFC01");
//     } else if (tableOption === 'Intermediate') {
//       this.initializeElements(width, height, tableBorderThickness, "#351F60", "#6C7FA7", "#E4E5E7");
//     } else if (tableOption === 'Advanced') {
//       this.initializeElements(width, height, tableBorderThickness, );
//     } else {
//       throw new Error('Invalid table option');
//     }
    
  
    
//     this.playerMoveControls();
    
//     Matter.Engine.run(this.engine);
    
    
//     Matter.Render.lookAt(this.render, {
//       min: { x: 0, y: 0 },
//       max: { x: this.render.options.width ?? 0, y: this.render.options.height ?? 0 },
//     });
//     Matter.Body.applyForce(this.ball, {x: width/2, y: height / 2}, {x: 0.5, y: 1.5})
//   }

//   private playerMoveControls(): void {
//     document.addEventListener("mousemove", (event) => {
//       const mouseX = event.clientX;
//       const tableWidth = this.element.getBoundingClientRect().width - 16 ;
//       const player2HalfWidth = (this.player2.bounds.max.x - this.player2.bounds.min.x) / 2;
//       const minPlayer2X = 16 + player2HalfWidth;
//       const maxPlayer2X = tableWidth - player2HalfWidth;
//       const clampedX = Math.min(Math.max(mouseX, minPlayer2X), maxPlayer2X);
//       Matter.Body.setPosition(this.player2, { x: clampedX, y: this.player2.position.y });
//     });
  
//     document.addEventListener("keydown", (event) => {
//       const key = event.key;
//       const playerSpeed = 200; 
//       const tableWidth = this.element.getBoundingClientRect().width - 16;
//       const player1HalfWidth = (this.player1.bounds.max.x - this.player1.bounds.min.x) / 2;
//       const minPlayer1X = 16 + player1HalfWidth;
//       const maxPlayer1X = tableWidth - player1HalfWidth;
  
//       if (key === "ArrowLeft" && this.player1) {
//         const newPos = Math.max(this.player1.position.x - playerSpeed, minPlayer1X);
//         Matter.Body.setPosition(this.player1, { x: newPos, y: this.player1.position.y });
//       } else if (key === "ArrowRight" && this.player1) {
//         const newPos = Math.min(this.player1.position.x + playerSpeed, maxPlayer1X);
//         Matter.Body.setPosition(this.player1, { x: newPos, y: this.player1.position.y });
//       }
//     });
//   }
  
//   public stopRendering(): void {
//     Render.stop(this.render);
//     World.clear(this.engine.world, false);
//     Engine.clear(this.engine);
//     this.render.canvas.remove();
//     console.log("stop rendering")                                                                                                       
//   }
//   private initializeElements(width: number, height: number, tableBorderThickness: number, PlayersColor: string, tableColor: string, ballColor: string): void {
 
//     this.tableBorderTop = Bodies.rectangle(
//       width / 2,
//       tableBorderThickness / 2,
//       width,
//       tableBorderThickness,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: PlayersColor,
//         },
//       }
//     );
  
//     this.tableBorderBottom = Bodies.rectangle(
//       width / 2,
//       height - tableBorderThickness / 2,
//       width,
//       tableBorderThickness,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: PlayersColor,
//         },
//       }
//     );
  
//     this.tableBorderLeft = Bodies.rectangle(
//       tableBorderThickness / 2,
//       height / 2,
//       tableBorderThickness,
//       height,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: PlayersColor,
//         },
//       }
//     );
    
//     this.tableBorderRight = Bodies.rectangle(
//       width - tableBorderThickness / 2,
//       height / 2,
//       tableBorderThickness,
//       height,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: PlayersColor,
//         },
//       }
//     );
  
//     this.player1 = Bodies.rectangle(
//       width / 2,
//       height * 0.1,
//       width * 0.2,
//       height * 0.02,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: PlayersColor,
//         },
//         chamfer: { radius: 10 },
//       }
//     );
  
//     this.player2 = Bodies.rectangle(
//       width / 2,
//       height * 0.9,
//       width * 0.2,
//       height * 0.02,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: PlayersColor,
//         },
//         chamfer: { radius: 10 },
//       }
//     );

//     this.ball = Bodies.circle(width / 2, height / 2, 15, {
//       density: 0.1,
//       inertia: Infinity,
//       friction: 0,
//       frictionAir: 0,
//       render: {
//         fillStyle: ballColor,
//         strokeStyle: "#ffffff",
//       },
//       restitution: 1,
//     });
//     const ballShadowRender = {
//       fillStyle: PlayersColor,
//       opacity: 0.5,
//       strokeStyle: PlayersColor, 
//       lineWidth: 0.5, 
//       blur: 8,
     
//     };
    
    


//     Matter.World.add(this.engine.world, [this.ballShadow]);



//     Matter.Events.on(this.engine, 'beforeUpdate', () => {
//       if (this.ball && this.ball.position) {
//         Matter.Body.setPosition(this.ballShadow, { x: this.ball.position.x, y: this.ball.position.y });
//       }
//     });

//     let obstacleWidth: number = width * 0.3;
// let obstacleHeight: number = height * 0.1;

// if (window.innerWidth < 768) {
//   obstacleWidth = width * 0.2;
//   obstacleHeight = height * 0.05;
// }

// let obstacle1PosY: number = height / 2 + 300;
// let obstacle2PosY: number = height / 2 - 300;
// let obstacle3PosX: number = width - tableBorderThickness / 2;
// let obstacle3PosY: number = height / 2 - 300;
// let obstacle4PosX: number = width - tableBorderThickness / 2;
// let obstacle4PosY: number = height / 2 + 300;

// if (window.innerWidth < 768) {
//   obstacle1PosY = height / 2 + 200;
//   obstacle2PosY = height / 2 - 200;
//   obstacle3PosY = height / 2 - 200;
//   obstacle4PosY = height / 2 + 200;
// }
    

//     if (tableColor === "#351F60") {
//       this.render.canvas.style.background = tableColor;
//       this.obstacle1 = Matter.Bodies.rectangle(
//         tableBorderThickness / 2,
//         obstacle1PosY,
//         obstacleWidth,
//         obstacleHeight,
//         {
//           isStatic: true,
//           render: {
//             fillStyle: PlayersColor,
//           },
//           chamfer: { radius: 20 },
//         }
//       );
      
//       this.obstacle2 = Matter.Bodies.rectangle(
//         tableBorderThickness / 2,
//         obstacle2PosY,
//         obstacleWidth,
//         obstacleHeight,
//         {
//           isStatic: true,
//           render: {
//             fillStyle: PlayersColor,
//           },
//           chamfer: { radius: 20 },
//         }
//       );
      
//       this.obstacle3 = Matter.Bodies.rectangle(
//         obstacle3PosX,
//         obstacle3PosY,
//         obstacleWidth,
//         obstacleHeight,
//         {
//           isStatic: true,
//           render: {
//             fillStyle: PlayersColor,
//           },
//           chamfer: { radius: 20 },
//         }
//       );
      
//       this.obstacle4 = Matter.Bodies.rectangle(
//         obstacle4PosX,
//         obstacle4PosY,
//         obstacleWidth,
//         obstacleHeight,
//         {
//           isStatic: true,
//           render: {
//             fillStyle: PlayersColor,
//           },
//           chamfer: { radius: 20 },
//         }
//       );
//       Matter.World.add(this.engine.world, [this.obstacle1, this.obstacle2, this.obstacle3, this.obstacle4]);
//     }
    
//     if (tableColor === "#6C7FA7") {
//       this.obstacle5 = Matter.Bodies.rectangle(
//         obstacle3PosX,
//         obstacle3PosY,
//         obstacleWidth,
//         obstacleHeight,
//         {
//           isStatic: true,
//           render: {
//             fillStyle: PlayersColor,
//           },
//           chamfer: { radius: 50 },
//         }
//       );
      
//       this.obstacle6 = Matter.Bodies.rectangle(
//         tableBorderThickness / 2,
//         obstacle1PosY,
//         obstacleWidth,
//         obstacleHeight,
//         {
//           isStatic: true,
//           render: {
//             fillStyle: PlayersColor,
//           },
//           chamfer: { radius: 20 },
//         }
//       );
    
//       Matter.World.add(this.engine.world, [this.obstacle5, this.obstacle6]);
//     }
//     Matter.World.add(this.engine.world, [
//       this.player1,
//       this.player2,
//       this.ball,
//       this.tableBorderLeft,
//       this.tableBorderRight,
//       this.tableBorderTop,
//       this.tableBorderBottom,
//     ]);
//   }
  socket: Socket | null;
	engine: Engine;
	world: Matter.World;
	render: Matter.Render;
	p1: Matter.Body;
	p2: Matter.Body;
	ball: Matter.Body;
	walls: Matter.Body[];
	obstacles: Matter.Body[] = [];
	tableOptions: string;
	mouse: Matter.Mouse;
	mouseConstraint: Matter.MouseConstraint;
  scaleFactor: number = 1;

 width: number;
 height: number ;

  ar: number = 800 / 600;

	obsts_data: { x: number, y: number, width: number, height: number }[] = [];

  themes: { tableColor: string, playerColor: string, ballColor: string }[] = [
    { tableColor: "#D2386D", playerColor: "#E4E5E7", ballColor: "#CBFC01" },
    { tableColor: "#6C7FA7", playerColor: "#351F60", ballColor: "#E4E5E7" },
    { tableColor: "#351F60", playerColor: "#D2386D", ballColor: "#E4E5E7" },
  ];
  theme: { tableColor: string, playerColor: string, ballColor: string };

  calculateWidthHeight(width: number, height: number): { width: number, height: number } {
    if (width > height) {
      let w  = height / this.ar;
      return { width: w, height: height }
    }
    let h = width * this.ar;
    if (h > height) {
      let w  = height / this.ar;
      return { width: w, height: height }
    }
    return { width: width, height: h };
  }

  map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

	constructor(tableOptions: string = "Beginner", theme: number, socket: Socket | null = null, dev: HTMLElement) {
		this.socket = socket;
    theme = theme % 3;
    this.theme = this.themes[theme];
		this.tableOptions = tableOptions;
		this.engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
		this.world = this.engine.world;
    this.width = dev.getBoundingClientRect().width;
    this.height = dev.getBoundingClientRect().height;
    let { width, height } = this.calculateWidthHeight(this.width, this.height);
    this.width = width;
    this.height = height;
		this.render = Matter.Render.create({
      element: dev,
			engine: this.engine,
			options: {
				width: this.width,
				height: this.height,
				wireframes: false,
				background: this.theme.tableColor,
			}
		});
    const widthScaleFactor = this.width / 600;
    const heightScaleFactor = this.height / 800;
    this.scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);
    console.log(this.width, this.height, dev.getBoundingClientRect().width, dev.getBoundingClientRect().height);
		this.p2 = Matter.Bodies.rectangle(this.width / 2, this.map(50, 0, 800, 0, this.height), this.map(100, 0, 600, 0, this.width), this.map(10, 0, 800, 0, this.height), { isStatic: true , render: { fillStyle: this.theme.playerColor }});
		this.p1 = Matter.Bodies.rectangle(this.width / 2, this.map(800 - 50, 0, 800, 0, this.height), this.map(100, 0, 600, 0, this.width), this.map(10, 0, 800, 0, this.height),  { isStatic: true , render: { fillStyle: this.theme.playerColor }});
		this.ball = Matter.Bodies.circle(this.width / 2, this.height / 2, 15 * this.scaleFactor, { isStatic: true, label: "ball",  render: {fillStyle: this.theme.ballColor, strokeStyle: "#ffffff", }, });
		this.walls = [
			Matter.Bodies.rectangle(this.width / 2, 0, this.width, this.map(10, 0, 800, 0, this.height), { isStatic: true, label: "top",render: { fillStyle: this.theme.playerColor } }),
			Matter.Bodies.rectangle(this.width / 2, this.height, this.width, this.map(10, 0, 800, 0, this.height), { isStatic: true, label: "bottom", render: { fillStyle: this.theme.playerColor } }),
			Matter.Bodies.rectangle(0, this.height / 2, this.map(10, 0, 600, 0, this.width), this.height, { isStatic: true, label: "left" ,render: { fillStyle: this.theme.playerColor }}),
			Matter.Bodies.rectangle(this.width, this.height / 2, this.map(10, 0, 600, 0, this.width), this.height, { isStatic: true, label: "right",render: { fillStyle: this.theme.playerColor } }),
		];
    this.obsts_data = [
        { x: 0, y: this.map(200, 0, 800, 0, this.height), width: this.map(100, 0, 600, 0, this.width), height: this.map(100, 0, 800, 0, this.height) },
        { x: this.map(600, 0, 600, 0, this.width), y: this.map(600, 0, 800, 0, this.height), width: this.map(100, 0, 600, 0, this.width), height: this.map(100, 0, 800, 0, this.height) },
        { x: this.map(600, 0, 600, 0, this.width), y: this.map(200, 0, 800, 0, this.height), width: this.map(100, 0, 600, 0, this.width), height: this.map(100, 0, 800, 0, this.height) },
        { x: 0, y: this.map(600, 0, 800, 0, this.height), width: this.map(100, 0, 600, 0, this.width), height: this.map(100, 0, 800, 0, this.height) },
      ];
		if (this.tableOptions != "Beginner") {
			this.obsts_data.forEach((data: { x: number, y: number, width: number, height: number }, index: number) => {
				if ((index < 2 && this.tableOptions == "Intermediate") || this.tableOptions == "Advanced")
					this.obstacles.push(Matter.Bodies.rectangle(data.x, data.y, data.width, data.height, { isStatic: true ,render: { fillStyle: this.theme.playerColor }}));
			});
		}
		Matter.World.add(this.world, [this.p1, this.p2, this.ball, ...this.walls, ...this.obstacles]);
		Matter.Render.run(this.render);
		Matter.Runner.run(this.engine);
		Matter.Events.on(this.engine, 'collisionStart', (event: Matter.IEventCollision<Matter.Engine>) => {
			if (event.pairs[0].bodyA.label == "ball" && event.pairs[0].bodyB.label == "bottom" || event.pairs[0].bodyA.label == "bottom" && event.pairs[0].bodyB.label == "ball") {
				console.log("goal to player 2");
			} else if (event.pairs[0].bodyA.label == "ball" && event.pairs[0].bodyB.label == "top" || event.pairs[0].bodyA.label == "top" && event.pairs[0].bodyB.label == "ball") {
				console.log("goal to player 1");
			}
		});
		this.mouse = Matter.Mouse.create(this.render.canvas);
		this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {mouse: this.mouse, constraint: {stiffness: 0, render: {visible: false}}});

		Matter.Events.on(this.engine, 'beforeUpdate', () => {
			if (this.mouse.position.x > 50 && this.mouse.position.x < this.width - 50) {
				this.socket?.emit('move', {position: {x: this.mouse.position.x, y: this.p1.position.y}});
			}
		});
	}

	upSideDown(): { p1: Vector, p2: Vector, ball: Vector } {
		return {
			p1: Vector.create(this.width - this.p1.position.x, this.height - this.p1.position.y),
			p2: Vector.create(this.width - this.p2.position.x, this.height - this.p2.position.y),
			ball: Vector.create(this.width - this.ball.position.x, this.height - this.ball.position.y),
		}
	}

	getState(): { p1: Vector, p2: Vector, ball: Vector } {
		return {
			p1: this.p1.position,
			p2: this.p2.position,
			ball: this.ball.position,
		}
	}

	restart(): void {
	}

	setSocket(socket: Socket): void {
		this.socket = socket;
	}

	update(data: { p1: Vector, p2: Vector, ball: Vector }): void {
		Body.setPosition(this.p1, data.p1);
		Body.setPosition(this.p2, data.p2);
		Body.setPosition(this.ball, data.ball);
	}

  stopRendering(): void {
    Matter.Render.stop(this.render);
    Matter.World.clear(this.engine.world, false);
    Engine.clear(this.engine);
    this.render.canvas.remove();
    console.log("stop rendering")                                                                                                       
  }
}

export default PingPongTable;