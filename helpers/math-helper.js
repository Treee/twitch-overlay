"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TWO_PI = Math.PI * 2;
exports.RADIANS = exports.TWO_PI / 360;
function randomRadianAngle() {
    // returns a number between 0 and 2pi
    return randomNumberBetween(0, 360) * exports.RADIANS;
}
exports.randomRadianAngle = randomRadianAngle;
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomNumberBetween = randomNumberBetween;
function randomNumberBetweenDecimals(min, max, decimalPlaces = 2) {
    // return Math.random() * (max - min + 1);
    var rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min); // could be min or max or anything in between
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
}
exports.randomNumberBetweenDecimals = randomNumberBetweenDecimals;
function calculateExponentialBackoffInMilliseconds(iteration, maxBackoff = 300000) {
    const powerOfTwo = Math.pow(2, iteration) * 1000;
    const randomMilliseconds = randomNumberBetween(1, 1000);
    // console.log(`iteration: ${iteration} power: ${powerOfTwo} seconds: ${powerOfTwo} randomMillis: ${randomMilliseconds}, maxBackoff: ${maxBackoff} backoff: ${Math.min(powerOfTwo + randomMilliseconds, maxBackoff)}`);
    return Math.min(powerOfTwo + randomMilliseconds, maxBackoff);
}
exports.calculateExponentialBackoffInMilliseconds = calculateExponentialBackoffInMilliseconds;
