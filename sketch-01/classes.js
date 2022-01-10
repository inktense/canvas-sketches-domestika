import { random } from "canvas-sketch-util";

const agentColorsArray = ['#B7094C', '#A01A58', '#892B64', '#723C70', '#5C4D7D', '#455E89', '#2E6F95', '#1780A1', '#0091AD']

export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Agent {
  constructor(x, y, color) {
    this.pos = new Vector(x, y);
    this.radius = random.range(5, 10);
    this.color = random.pick(agentColorsArray);
    this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1));
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  draw(context) {
    context.fillStyle = this.color;

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}
