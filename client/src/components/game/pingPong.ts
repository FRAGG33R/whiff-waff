import Matter, { Engine, Render, World, Bodies } from 'matter-js';

class PingPongTable {
  private engine: any;
  private render: any;
  private player1: any;
  private player2: any;
  private ball: any;
  private element: HTMLElement;
  private tableBorderLeft: any;
  private tableBorderRight: any;
  private playerSpeed: number = 7;
  private player1Score: number = 0;
  private player2Score: number = 0;

  constructor(element: HTMLElement) {
    this.element = element;
    let width = element.getBoundingClientRect().width;
    let height = element.getBoundingClientRect().height;
    const tableBorderThickness = 15;
    this.engine = Matter.Engine.create({gravity: {x: 0, y: 0}});
    this.render = Matter.Render.create({
      element: element,
      engine: this.engine,
      options: {
        width: width,
        height: height,
        background: "#ADE6FE",
        wireframes: false,
      },
    });
    this.tableBorderLeft = Bodies.rectangle(
      tableBorderThickness / 2,
      height / 2,
      tableBorderThickness,
      height,
      {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
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
          fillStyle: "#3C6A8E",
        }
      }
    );
    this.player1 = Matter.Bodies.rectangle(
      width / 2,
      height * 0.1,
      width * 0.2,
      height * 0.02,
      {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
        chamfer: { radius: 10 },
      }
    );
    
    this.player2 = Matter.Bodies.rectangle(
      width / 2,
      height * 0.9,
      width * 0.2,
      height * 0.02,
      {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
        },
        chamfer: { radius: 10 },
      }
    );
    this.ball = Matter.Bodies.circle(width / 2, height / 2, 15, {
      density: 0.1,
      inertia: Infinity,
      friction: 0,
      frictionAir: 0,
      render: {
        fillStyle: "#3C6A8E",
        strokeStyle: "#ffffff",
      },
      restitution: 1,
    });

    Matter.Events.on(this.engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
  
        if (
          (pair.bodyA === this.ball && pair.bodyB === this.player1) ||
          (pair.bodyB === this.ball && pair.bodyA === this.player1)
        ) {
          this.increasePlayerScore(2);
          this.resetBall();
        } else if (
          (pair.bodyA === this.ball && pair.bodyB === this.player2) ||
          (pair.bodyB === this.ball && pair.bodyA === this.player2)
        ) {
          this.increasePlayerScore(1);
          this.resetBall();
        }
      }
    });

    this.playerMoveControls();
    this.showScores();

    Matter.World.add(this.engine.world, [
      this.player1,
      this.player2,
      this.ball,
      this.tableBorderLeft,
      this.tableBorderRight,
    ]);
    Matter.Engine.run(this.engine);

    Matter.Render.run(this.render);

    Matter.Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: this.render.options.width, y: this.render.options.height },
    });
    Matter.Body.applyForce(this.ball, {x: width/2, y: height / 2}, {x: 0, y: 0.8})
  }

  private playerMoveControls(): void {
    document.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
  
      Matter.Body.setPosition(this.player1, { x: mouseX, y: this.player1.position.y });
    });
  }
  private resetBall(): void {
    // Matter.Body.setPosition(this.ball, {
    //   x: this.render.options.width / 2,
    //   y: this.render.options.height / 2,
    // });
    // Matter.Body.setVelocity(this.ball, { x: 0, y: 0 });
  }

  private increasePlayerScore(playerNumber: number): void {
    if (playerNumber === 1) {
      this.player1Score++;
    } else if (playerNumber === 2) {
      this.player2Score++;
    }
    this.showScores();
  }

  private showScores(): void {
    const scoresElement = document.createElement("div");
    scoresElement.innerHTML = `Player 1 Score: ${this.player1Score}<br>Player 2 Score: ${this.player2Score}`;
  }
  public stopRendering(): void {
    Render.stop(this.render);
    World.clear(this.engine.world, false);
    Engine.clear(this.engine);
    this.render.canvas.remove();
    console.log("stop rendering")                                                                                                       
  }



}

export default PingPongTable;

