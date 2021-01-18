import {random} from './utils.js';

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 900;

class Ball {
    constructor(x, y, radius, color, speed) {
        this.radius = radius || random.randInt(10, 20);
        this.color = color || random.getRandomHexColor();
        this.speed = speed || random.randRange(0, 1, 2);

        this.startX = this.radius;
        this.endX = CANVAS_WIDTH - this.radius;
        this.startY = this.radius;
        this.endY = CANVAS_HEIGHT - this.radius;

        this.x = x || random.randInt(this.startX, this.endX);
        this.y = y || random.randInt(this.startY, this.endY);

        this.xDirection = 1;
        this.yDirection = 1;
    }

    changeXDirection = () => this.xDirection = this.xDirection === 1 ? -1 : 1;

    changeYDirection = () => this.yDirection = this.yDirection === 1 ? -1 : 1;

    updatePosition = () => {
        if (this.x >= this.endX || this.x <= this.startX) this.changeXDirection();
        if (this.y >= this.endY || this.y <= this.startY) this.changeYDirection();

        this.x += this.speed * this.xDirection;
        this.y += this.speed * this.yDirection;
    }
}


class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
    }

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addStyles = () => {
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
    }

    renderBall = (ball) => {
        ball.updatePosition();

        this.ctx.beginPath();

        this.ctx.fillStyle = ball.color;
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.closePath();
    }

    render = (balls) => {
        this.clearCanvas();

        balls.forEach(ball => {
            this.renderBall(ball);
        })

        requestAnimationFrame(() => this.render(balls));
    }

    run = () => {
        this.addStyles();
    }
}


function main() {
    const canvas = new Canvas(document.getElementById('canvas'));
    const balls = [];

    for (let i = 0; i < 3000; i++) {
        balls.push(new Ball());
    }

    canvas.render(balls);

    canvas.run();
}


main();
