const canvasSketch = require('canvas-sketch');
import { random, math } from "canvas-sketch-util";
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
	cols: 50,
	rows: 50,
	scaleMin: 1,
	scaleMax: 10,
	freq: 0.001,
	amp: 0.2,
	frame: 0,
	animate: true,
	lineCap: 'butt',
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#354f52';
    context.fillRect(0, 0, width, height);

		const cols = params.cols;
		const rows = params.rows;
    const numCells = cols * rows;

    // Creating a working space in the canvas.
    const gridW = width * 0.8;
    const gridH = height * 0.8;
    // Calculating the width and height of a cell.
    const cellW = gridW / cols;
    const cellH = gridH / rows;
    // Calculating the margin of Y and X sides.
    const margX = (width - gridW) * 0.5;
    const margY = (height - gridH) * 0.5;

    for(let i = 0; i < numCells; i ++) {
      // i % 4 = 0, 1, 2, 3
      const col = i % cols;
      // Math.floor(i / 4) = 0, 0, 0, 0, 1, 1, 1, 1;
      const row = Math.floor(i / cols);

      const x = col * cellW;
      const y = row * cellH;
      const w = cellW * 0.8;
      const h = cellH * 0.8;

      const n = random.noise3D(x, y, 1 * 10, params.freq);
      const angle = n * Math.PI * 0.2;

      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(margX, margY);
      context.translate(cellW * 0.5, cellH * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.strokeStyle = "white";
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
	const pane = new Tweakpane.Pane();
	let folder;

	folder = pane.addFolder({ title: 'Grid '});
	folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' }});
	folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
	folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
	folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
	folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

	folder = pane.addFolder({ title: 'Noise' });
	folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
	folder.addInput(params, 'amp', { min: 0, max: 1 });
	folder.addInput(params, 'animate');
	folder.addInput(params, 'frame', { min: 0, max: 999 });
};

createPane();

canvasSketch(sketch, settings);
