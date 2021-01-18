export const calculateDistanceBetweenBalls = (ball1, ball2) => {
    return (((ball2.x - ball1.x) ** 2) + ((ball2.y - ball1.y) ** 2)) ** 0.5
}

class Random {
    randRange = (min, max, roundNumber) => {
        const randomNumber = Math.random() * (max - min) + min;
        return roundNumber ? randomNumber.toFixed(roundNumber) : randomNumber;
    }

    randInt = (min, max) => {
        return parseInt(this.randRange(min, max));
    }

    getRandomHexColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
}

export const random = new Random();
