const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    console.log(width, height);
    context.fillStyle = '#A5A58D';
    context.fillRect(0, 0, width, height);

    // Represents 16.67% and 12.5% from width and height
    const x = height * 0.125;
    const y = height * 0.125;
    const collorsArray = ["#FFD046", "#72A276", "#132E32", "#CE6C47", "#735D78", "#B6D094"]

    for (let i = 0; i < 4; i++) { 
      for (let j = 0; j < 4; j++) { 

        const circleX = x + x * 2 * i;
        const circleY = y + y * 2 * j;

        const radius = x * 0.7;
        const startAngle = 0;
        const endAngle = Math.PI + (Math.PI * random.pick([0.5, 1, 1.5, 2])) ;
        const counterclockwise = random.boolean();

        context.beginPath();
        context.arc(circleX, circleY, radius, startAngle, endAngle, counterclockwise)

        const fill = random.pick(collorsArray)
        context.fillStyle = fill;
        context.fill();
      }
    }
  };
};

canvasSketch(sketch, settings);



