// import { Random } from "random-js";

// const rng = new Random();

export function getRandomExp(avgT: number): number {
    let x = Math.random();

    let res = -Math.log(x) * avgT;

    return res;
}

// export function getRandomNorm(avgT: number): number {
//     let u = 1 - Math.random();
//     let v = Math.random();

//     let res =
//         (Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)) / 10.0 +
//         0.5;

//     return res * (avgT * 2);
// }

export function getRandomNorm(avgT: number, sigma: number): number {
    let u = Math.random();
    let v = Math.random();

    // let res =
    //     (Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)) / 10.0 +
    //     0.5;

    // return res * (avgT * 2);

    let res = Math.cos(2 * Math.PI * u) * Math.sqrt(-2 * Math.log(v))

    return avgT + sigma * res
}

/*
function GetRandomNorm(AvgT:real;Sigma:real):real;
 var z1,z2,r:real;
 begin
   z1:=random();
   z2:=random();
   r:=cos(2*Pi*z1)* sqrt(-2*ln(z2));
   result:=AvgT+Sigma*r;
 end;
*/