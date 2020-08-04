export const TWO_PI = Math.PI * 2;
export const RADIANS = TWO_PI / 360;

export function randomRadianAngle() {
    // returns a number between 0 and 2pi
    return randomNumberBetween(0, 360) * RADIANS;
}

export function randomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomNumberBetweenDecimals(min: number, max: number, decimalPlaces: number = 2): number {
    // return Math.random() * (max - min + 1);
    var rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);  // could be min or max or anything in between
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
}

export function calculateExponentialBackoffInMilliseconds(iteration: number, maxBackoff: number = 300000): number {
    const powerOfTwo = Math.pow(2, iteration) * 1000;
    const randomMilliseconds = randomNumberBetween(1, 1000);
    // console.log(`iteration: ${iteration} power: ${powerOfTwo} seconds: ${powerOfTwo} randomMillis: ${randomMilliseconds}, maxBackoff: ${maxBackoff} backoff: ${Math.min(powerOfTwo + randomMilliseconds, maxBackoff)}`);
    return Math.min(powerOfTwo + randomMilliseconds, maxBackoff);
}
