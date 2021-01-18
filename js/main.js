import {random} from './utils.js';

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

class Ball {
    constructor(x, y, radius, color, speed) {
        this.x = x || random.randInt(0, CANVAS_WIDTH);
        this.y = y || random.randInt(0, CANVAS_HEIGHT);
        this.radius = radius || random.randInt(10, 20);
        this.color = color || random.getRandomHexColor();
        this.speed = speed || random.randRange(0, 1, 2);

        this.xDirection = 1;
        this.yDirection = 1;
    }

    changeDirection = () => {
        this.xDirection = this.xDirection === 1 ? -1 : 1;
        this.yDirection = this.yDirection === 1 ? -1 : 1;
    }

    updatePosition = () => {
        this.x += this.speed * this.xDirection;
        this.y += this.speed * this.yDirection;
    }
}
