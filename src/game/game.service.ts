import { Injectable } from '@nestjs/common';
import { Socket } from 'dgram';
import Matter, { Engine, Render, Bodies, World, Runner, Events, IEventCollision } from 'matter-js';
import { SocketReadyState } from 'net';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {


	id1: string;
	id2: string;
	player1: Socket;
	player2: Socket;
	status: boolean;
	ready: boolean;

	engine: Engine;
	world: Matter.World;
	render: Matter.Render;
	p1: Matter.Body;
	p2: Matter.Body;
	ball: Matter.Body;
	walls: Matter.Body[];
	obstacles: Matter.Body[] = [];
	tableOptions: string;
	runner: Matter.Runner;

	width: number = 600;
	height: number = 800;

	sccor1: number = 0;
	sccor2: number = 0;

	obsts_data: { x: number, y: number, width: number, height: number }[] = [
		{ x: 0, y: 200, width: 100, height: 100 },
		{ x: 600, y: 600, width: 100, height: 100 },
		{ x: 600, y: 200, width: 100, height: 100 },
		{ x: 0, y: 600, width: 100, height: 100 },
	];

	constructor(player1: Socket) {
		this.runner = Runner.create();
		this.player1 = player1;
		this.engine = Engine.create({ gravity: { x: 0, y: 0 } });
		this.world = this.engine.world;
		this.p2 = Bodies.rectangle(this.width / 2, 50, 100, 10, { isStatic: true });
		this.p1 = Bodies.rectangle(this.width / 2, this.height - 50, 100, 10, { isStatic: true });
		this.ball = Bodies.circle(this.width / 2, this.height / 2, 15, { friction: 0, restitution: 1, inertia: Infinity, density: 0.1, frictionAir: 0, force: { x: 1.5, y: 1.2 }, label: "ball" });
		this.walls = [
			Bodies.rectangle(this.width / 2, 0, this.width, 10, { isStatic: true, label: "top" }),
			Bodies.rectangle(this.width / 2, this.height, this.width, 10, { isStatic: true, label: "bottom" }),
			Bodies.rectangle(0, this.height / 2, 10, this.height, { isStatic: true, label: "left" }),
			Bodies.rectangle(this.width, this.height / 2, 10, this.height, { isStatic: true, label: "right" }),
		];
		if (this.tableOptions != "beginner") {
			this.obsts_data.forEach((data: { x: number, y: number, width: number, height: number }, index: number) => {
				if ((index < 2 && this.tableOptions == "intermidiate") || this.tableOptions == "advanced")
					this.obstacles.push(Bodies.rectangle(data.x, data.y, data.width, data.height, { isStatic: true }));
			});
		}
		World.add(this.world, [this.p1, this.p2, ...this.walls, ...this.obstacles]);
		Runner.run(this.runner, this.engine);
		Events.on(this.engine, 'collisionStart', (event: IEventCollision<Engine>) => {
			let stoped: boolean = false;
			if (event.pairs[0].bodyA.label == "ball" && event.pairs[0].bodyB.label == "bottom" || event.pairs[0].bodyA.label == "bottom" && event.pairs[0].bodyB.label == "ball") {
				this.sccor2++;
				World.remove(this.world, this.ball);
				stoped = true;
			} else if (event.pairs[0].bodyA.label == "ball" && event.pairs[0].bodyB.label == "top" || event.pairs[0].bodyA.label == "top" && event.pairs[0].bodyB.label == "ball") {
				World.remove(this.world, this.ball);
				this.sccor1++;
				stoped = true;
			}
			if (this.sccor1 > this.sccor2 && this.sccor1 == 5) {
				this.player1?.emit('gameOver', { p1: 'won', p2: 'lost'});
				this.player2?.emit('gameOver', { p1: 'won', p2: 'lost'});
				Runner.stop(this.runner);
			} else if (this.sccor2 > this.sccor1 && this.sccor2 == 5) {
				Runner.stop(this.runner);
				this.player1?.emit('gameOver', { p2: 'won', p1: 'lost'});
				this.player2?.emit('gameOver', { p2: 'won', p1: 'lost'});
			}
			if (stoped){
				setTimeout(() => {
					this.spownBall();
				}, 1000);
			}
		});
		
		Events.on(this.engine, 'afterUpdate', () => {
			this.player1.emit('update', { ball: this.ball?.position, p1: this.p1.position, p2: this.p2.position, score1: this.sccor1, score2: this.sccor2});
		});
	}

	setPlayer1(player: Socket): void {
		this.player1 = player;
	}

	setPlayer2(player: Socket): void {
		this.player2 = player;
	}

	getPlayer1(): Socket {
		return this.player1;
	}

	getPlayer2(): Socket {
		return this.player2;
	}

	spownBall(): void {
		this.ball = Bodies.circle(this.width / 2, this.height / 2, 15, { friction: 0, restitution: 1, inertia: Infinity, density: 0.1, frictionAir: 0, force: { x: 1.9, y: 1.6 }, label: "ball" });
		World.add(this.world, this.ball);
	}
}
