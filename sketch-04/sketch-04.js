const canvasSketch = require("canvas-sketch");
import { random } from "canvas-sketch-util";
import { Agent } from './classes'

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

// Animation without the canvas-sketch library
// const animate = () => {
//   console.log("Hello World");
//   requestAnimationFrame(animate);
// }
// animate();

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 110; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "#EDDCD2";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);
