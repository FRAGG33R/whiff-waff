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
  private tableBorderTop: any;
  private tableBorderBottom: any;

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
    
    this.tableBorderTop = Bodies.rectangle(
      width / 2,
      tableBorderThickness / 2,
      width,
      tableBorderThickness,
      {
        isStatic: true,
        render: {
          fillStyle: "#3C6A8E",
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
          fillStyle: "#3C6A8E",
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

   
    this.playerMoveControls();

    Matter.World.add(this.engine.world, [
      this.player1,
      this.player2,
      this.ball,
      this.tableBorderLeft,
      this.tableBorderRight,
      this.tableBorderTop,
      this.tableBorderBottom,
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
  
      Matter.Body.setPosition(this.player2, { x: mouseX, y: this.player2.position.y });
    });
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

