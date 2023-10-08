
import Matter, { Engine, Body,Vector} from 'matter-js';
import { useRouter } from 'next/router';
import { Socket,io } from "socket.io-client";
class PingPongTable {
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