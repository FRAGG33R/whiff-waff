import { useEffect } from "react"
import { Engine, Render, World, Bodies, MouseConstraint, Events, Body } from 'matter-js';

export default function Game()
{
	const gameInit = () => {
		// Create engine
		const engine = Engine.create();
	  
		// Create renderer
		const render = Render.create({
		  element: document.body,
		  engine: engine,
		  options: {
			width: 800,
			height: 600,
			wireframes: false
		  }
		});
	  
		// Create objects
		const box = Bodies.rectangle(400, 200, 80, 80);
		const ground = Bodies.rectangle(400, 610, 800, 60, { isStatic: true });
		const player = Bodies.rectangle(400, 200, 80, 80, { restitution: 0.5 });

		// Add mouse constraint for interaction
		const mouseConstraint = MouseConstraint.create(engine, {
		  element: render.canvas,
		  constraint: {
			render: {
			  visible: false
			}
		  }
		} as any);
		
		Events.on(mouseConstraint, "mousemove", (event : any) => {
			const mouseX = event.mouse.position.x;
			const mouseY = event.mouse.position.y;
			Body.setPosition(player, { x: mouseX, y: mouseY });
		  });
		// Add objects to world
		World.add(engine.world, [box, ground]);
	  
		// Run the engine
		Engine.run(engine);
	  
		// Run the renderer
		Render.run(render);
	  };

	useEffect(() => {
		gameInit();
	}, []);

	return <div></div>
}