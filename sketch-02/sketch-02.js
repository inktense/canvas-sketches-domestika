const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// Transform Degrees to Radiants
const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#B1EDE8";
    context.fillRect(0, 0, width, height);

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    //context.fillStyle = "black";
    const fill = context.createLinearGradient(0, 0, w, h);
    fill.addColorStop(0, '#484D6D');
    fill.addColorStop(1, '#FF6978');

    // Fill rectangle
    context.fillStyle = fill;

    context.save();
    context.translate(x, y);
    context.rotate(degToRad(45));

    context.beginPath();
    context.rect(-w * 0.5, -h * 0.5, w, h);
    context.fill();
    context.restore();
  };
};

canvasSketch(sketch, settings);
