import { Injectable } from '@nestjs/common';
import { Socket } from 'dgram';
import Matter, { Engine, Bodies, World, Runner, Events, IEventCollision, Vector } from 'matter-js';
import { Map, Mode } from '@prisma/client'
import axios from 'axios';
import { GameDto } from 'src/dto';
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
		{ x: 0, y: 400, width: 30, height: 50 },
		{ x: 600, y: 400, width: 30, height: 50 },
	];

	constructor(client: Socket, tableOptions: string) {

		this.tableOptions = tableOptions;
		this.runner = Runner.create();
		this.player1 = client;
		this.player2 = null;
		this.engine = Engine.create({ gravity: { x: 0, y: 0 } });
		this.world = this.engine.world;
		this.p2 = Bodies.rectangle(this.width / 2, 50, 120, 10, { isStatic: true });
		this.p1 = Bodies.rectangle(this.width / 2, this.height - 50, 120, 10, { isStatic: true });
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
				const newGame = {rightUserId: this.user1ID, leftUserId: this.user2ID, rightScore: this.sccor1, leftScore: this.sccor2, map: this.tableOptions, mode: Mode.CHALLENGE, isAccept: true};
			    axios.post('http://localhost:4000/api/v1/game/save', newGame).then((res) => {}).catch((err) => { });
			} else if (this.sccor2 > this.sccor1 && this.sccor2 == 5) {
				this.player2?.emit('gameOver', { msg: 'You won' });
				this.player1?.emit('gameOver', { msg: 'You lost' });
				this.stop();
				const newGame = {rightUserId: this.user2ID, leftUserId: this.user1ID, rightScore: this.sccor2, leftScore: this.sccor1, map: this.tableOptions,  mode: Mode.CHALLENGE, isAccept: true};
			    axios.post('http://localhost:4000/api/v1/game/save', newGame).then((res) => {}).catch((err) => { }); 
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
		let forceX: number = -1.3;
		let forceY: number = -1.2;
		if (this.serve) {
			forceX = 1.3;
			forceY = 1.2;
			this.serve = !this.serve;
		} else
			this.serve = !this.serve;
		this.ball = Bodies.circle(this.width / 2, this.height / 2, 13, { friction: 0, restitution: 1, inertia: Infinity, density: 0.071, frictionAir: 0, force: { x: forceX, y: forceY }, label: "ball" });
		setTimeout(() => {
			World.add(this.world, this.ball);
		}, 1500);
	}

	stop(): void {
		Runner.stop(this.runner);
		this.isRunning = false;
	}
}
