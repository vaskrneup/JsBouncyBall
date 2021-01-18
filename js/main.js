import {random, calculateDistanceBetweenBalls} from './utils.js';
import {
    BALL_COUNT,
    BALL_MAX_RADIUS,
    BALL_MAX_SPEED,
    BALL_MIN_RADIUS,
    BALL_MIN_SPEED,
    CANVAS_HEIGHT,
    CANVAS_WIDTH
} from "./constants.js";


class Ball {
    /**
     * Represents a ball, that can be used in canvas.
     * DEFAULT variables are defined at ./constants.js
     *
     * @param {Number} [x]                  X position of the ball, if not provided random value will be chosen.
     * @param {Number} [y]                  Y position of the ball, if not provided random value will be chosen.
     * @param {Number} [radius]             Radius of the ball, if not provided random value will be chosen.
     * @param {String} [color]              Color of the ball, if not provided random value will be chosen.
     * @param {Number} [speed]              Speed of the ball, if not provided random value will be chosen.
     * @param {Number} [xDirection=-1|1]    Starting direction of ball in x axis, if not provided random value will be chosen.
     * @param {Number} [yDirection=-1|1]    Starting direction of ball in y axis, if not provided random value will be chosen.
     */
    constructor(x, y, radius, color, speed, xDirection, yDirection) {
        this.radius = radius || random.randInt(BALL_MIN_RADIUS, BALL_MAX_RADIUS);
        this.color = color || random.getRandomHexColor();
        this.speed = speed || random.randInt(BALL_MIN_SPEED, BALL_MAX_SPEED);

        this.startX = this.radius;
        this.endX = CANVAS_WIDTH - this.radius;
        this.startY = this.radius;
        this.endY = CANVAS_HEIGHT - this.radius;

        this.x = x || random.randInt(this.startX, this.endX);
        this.y = y || random.randInt(this.startY, this.endY);

        this.xDirection = xDirection || Math.random() > 0.5 ? -1 : 1;
        this.yDirection = yDirection || Math.random() > 0.5 ? -1 : 1;
    }

    /**
     * Changes direction of balls on collision.
     *
     * @param {Ball[]} balls      Array
     * */
    changeDirectionOnCollision = (balls) => {
        balls.forEach(ball => {
            if (ball !== this) {
                const distanceBetweenBalls = calculateDistanceBetweenBalls(this, ball);
                const sumOfBallRadius = this.radius + ball.radius;
                const ballTouchPosition = sumOfBallRadius - distanceBetweenBalls;

                if (sumOfBallRadius >= distanceBetweenBalls) {
                    this.changeXDirection();
                    this.changeYDirection();

                    this.x += ballTouchPosition * this.xDirection;
                    this.y += ballTouchPosition * this.yDirection;
                }
            }
        });
    }

    /**
     * Changes ball's X direction.
     * */
    changeXDirection = () => this.xDirection = -this.xDirection;

    /**
     * Changes ball's Y direction.
     * */
    changeYDirection = () => this.yDirection = -this.yDirection;

    /**
     * Updates ball position, using speed and direction && Frees the balls that is stuck at the end of window.
     * */
    updatePosition = () => {
        if (this.x >= this.endX) {
            this.changeXDirection();
            this.x = this.endX;
        } else if (this.x <= this.startX) {
            this.changeXDirection();
            this.x = this.startX;
        }

        if (this.y >= this.endY) {
            this.changeYDirection();
            this.y = this.endY;
        } else if (this.y <= this.startY) {
            this.changeYDirection();
            this.y = this.startY;
        }

        this.x += this.speed * this.xDirection;
        this.y += this.speed * this.yDirection;
    }

    render = (ctx) => {
        this.updatePosition();

        ctx.beginPath();

        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.closePath();
    }
}


class Canvas {
    /**
     * Object for easily maintaining the canvas.
     *
     * @param {String} canvasId         Id of the canvas.
     * */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
    }

    /**
     * Clears the canvas.
     *
     */
    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Renders any object provided to the canvas.
     *
     * @param {Ball[]} balls      Balls to render.
     */
    render = (balls) => {
        this.clearCanvas();

        balls.forEach(ball => {
            ball.render(this.ctx);
            ball.changeDirectionOnCollision(balls)
        })

        requestAnimationFrame(() => this.render(balls));
    }
}


/**
 * Creates non overlapping ball objects.
 *
 * @param {Number} numberOfBalls        Number of balls to generate and render.
 * @param {Number} [radius]             Radius of the ball, if not provided random value will be chosen.
 * @param {String} [color]              Color of the ball, if not provided random value will be chosen.
 * @param {Number} [speed]              Speed of the ball, if not provided random value will be chosen.
 * @param {Number} [xDirection=-1|1]    Starting direction of ball in x axis, if not provided random value will be chosen.
 * @param {Number} [yDirection=-1|1]    Starting direction of ball in y axis, if not provided random value will be chosen.
 * */
function createAndRenderBalls(
    numberOfBalls = BALL_COUNT,
    radius,
    color,
    speed,
    xDirection,
    yDirection
) {
    const canvas = new Canvas("canvas");
    const balls = [];

    for (let i = 0; i < numberOfBalls; i++) {
        let ball = new Ball(null, null, radius, color, speed, xDirection, yDirection);

        if (i !== 0) {
            for (let j = 0; j < balls.length; j++) {
                if ((balls[j].radius + ball.radius) >= calculateDistanceBetweenBalls(balls[j], ball)) {
                    ball = new Ball(null, null, radius, color, speed, xDirection, yDirection);
                    j = -1;
                }
            }
        }

        balls.push(ball);
    }

    canvas.render(balls);
}


createAndRenderBalls();
