const canvasSketch = require("canvas-sketch");
import { random } from "canvas-sketch-util";
import { Agent } from "./classes";

const settings = {
  dimensions: [1080, 1080],
};

// Generate an array of random numbers
const randomArray = Array.from({ length: 30 }, () =>
  Math.floor(Math.random() * 1000)
);
const length = randomArray.length;

function swap(arr, xp, yp) {
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}

const sketch = ({ context, width, height }) => {
  const x = height * 0.1;
  const y = width * (length/100);
  console.log(x, y )
  const agents = [];

  console.log(randomArray);
  for (let i = 0; i < length; i++) {
    agents.push(new Agent(x, y + (i * y)));
  }
  // for(let i = 0; i < length - 1; i++) {
  //   for(let j = 0; j < length - i - 1; j++) {

  //     if (randomArray[j] > randomArray[j + 1]) {

  //       console.log(randomArray[j])
  //       context.arc(j, j + 1, 100, 0, Math.PI * 2);
  //       context.fillStyle = 'black';
  //       context.fill();

  //       swap(randomArray,j,j+1);
  //     }
  //   }
  // }
  // const agents = [];

  // for (let i = 0; i < 110; i++) {
  //   const x = random.range(0, width);
  //   const y = random.range(0, height);

  //   agents.push(new Agent(x, y));
  // }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);
