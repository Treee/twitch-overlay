export function randomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function calculateExponentialBackoffInMilliseconds(iteration: number, maxBackoff: number = 300000): number {
    const powerOfTwo = Math.pow(2, iteration) * 1000;
    const randomMilliseconds = randomNumberBetween(1, 1000);
    // console.log(`iteration: ${iteration} power: ${powerOfTwo} seconds: ${powerOfTwo} randomMillis: ${randomMilliseconds}, maxBackoff: ${maxBackoff} backoff: ${Math.min(powerOfTwo + randomMilliseconds, maxBackoff)}`);
    return Math.min(powerOfTwo + randomMilliseconds, maxBackoff);
}
