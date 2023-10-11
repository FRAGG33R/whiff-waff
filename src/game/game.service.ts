import { Injectable } from '@nestjs/common';
import { Socket } from 'dgram';
import Matter, { Engine, Bodies, World, Runner, Events, IEventCollision, Vector } from 'matter-js';
import { Map } from '@prisma/client'
@Injectable()
export class GameService {

	user1ID: string;
	user2ID: string;
	id1: string;
	id2: string;
	player1: Socket;
	player2: Socket;
	status: boolean;
	ready: boolean;

	engine: Engine;
	world: Matter.World;
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

	serve: boolean = true;
	isRunning: boolean = true;

	obsts_data: { x: number, y: number, width: number, height: number }[] = [
		{ x: 0, y: 200, width: 100, height: 100 },
		{ x: 600, y: 600, width: 100, height: 100 },
		{ x: 600, y: 200, width: 100, height: 100 },
		{ x: 0, y: 600, width: 100, height: 100 },
	];

	constructor(client: Socket, tableOptions: string) {

		this.tableOptions = tableOptions;
		this.runner = Runner.create();
		this.player1 = client;
		this.player2 = null;
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
		if (this.tableOptions != Map.Beginner) {
			this.obsts_data.forEach((data: { x: number, y: number, width: number, height: number }, index: number) => {
				if ((index < 2 && this.tableOptions == Map.Intermediate) || this.tableOptions == Map.Advanced)
					this.obstacles.push(Bodies.rectangle(data.x, data.y, data.width, data.height, { isStatic: true }));
			});
		}

		World.add(this.world, [this.p1, this.p2, ...this.walls, ...this.obstacles]);
		Runner.run(this.runner, this.engine);
		Events.on(this.engine, 'collisionStart', (event: IEventCollision<Engine>) => {
			let stoped: boolean = false;
			if (event.pairs[0].bodyA.label == "ball" && event.pairs[0].bodyB.label == "bottom" || event.pairs[0].bodyA.label == "bottom" && event.pairs[0].bodyB.label == "ball") {
				World.remove(this.world, this.ball);
				this.sccor2++;
				stoped = true;
			} else if (event.pairs[0].bodyA.label == "ball" && event.pairs[0].bodyB.label == "top" || event.pairs[0].bodyA.label == "top" && event.pairs[0].bodyB.label == "ball") {
				World.remove(this.world, this.ball);
				this.sccor1++;
				stoped = true;
			}
			if (this.sccor1 > this.sccor2 && this.sccor1 == 5) {
				this.player1?.emit('gameOver', { msg: 'You won' });
				this.player2?.emit('gameOver', { msg: 'You lost' });
				this.stop();
				// DOTO : add score to db
			} else if (this.sccor2 > this.sccor1 && this.sccor2 == 5) {
				this.player2?.emit('gameOver', { msg: 'You won' });
				this.player1?.emit('gameOver', { msg: 'You lost' });
				this.stop();
				// DOTO : add score to db
			}
			if (stoped) {
				setTimeout(() => {
					this.spownBall();
				}, 1000);
			}
		});

		Events.on(this.engine, 'afterUpdate', () => {
			this.player1?.emit('update', { ball: this.ball?.position, p1: this.p1.position, p2: this.p2.position, score1: this.sccor1, score2: this.sccor2 });
			this.player2?.emit('update', { ball: this.reverseVector(this.ball?.position), p1: this.reverseVector(this.p1.position), p2: this.reverseVector(this.p2.position), score1: this.sccor2, score2: this.sccor1 });
		});
	}

	reverseVector(vector: Vector): Vector {
		return ({ x: this.width - vector.x, y: this.height - vector.y });
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
		if (!this.isRunning) {
			this.isRunning = !this.isRunning;
			Runner.run(this.runner, this.engine);
			return;
		}
		let forceX: number = -1.9;
		let forceY: number = -1.6;
		if (this.serve) {
			forceX = 1.9;
			forceY = 1.6;
			this.serve = !this.serve;
		} else
			this.serve = !this.serve;
		this.ball = Bodies.circle(this.width / 2, this.height / 2, 15, { friction: 0, restitution: 1, inertia: Infinity, density: 0.071, frictionAir: 0, force: { x: forceX, y: forceY }, label: "ball" });
		World.add(this.world, this.ball);
	}

	stop(): void {
		Runner.stop(this.runner);
		this.isRunning = false;
	}
}
