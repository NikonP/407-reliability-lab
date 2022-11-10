// import { Random } from "random-js";

// const rng = new Random();

export function getRandomExp(avgT: number): number {
    let x = Math.random();

    let res = -Math.log(x) * avgT;

    return res;
}

export function getRandomNorm(avgT: number): number {
    let u = 1 - Math.random();
    let v = Math.random();

    let res =
        (Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)) / 10.0 +
        0.5;

    return res * avgT;
}
