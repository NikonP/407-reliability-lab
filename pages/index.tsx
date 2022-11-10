import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { ReactNode, useState } from "react";
import Example from "../components/example";
import MassServiceSystem from "../components/MassServiceSystem";

export default function Home() {
    return (
        <div>
            {/* <Example delay={100}></Example> */}
            <MassServiceSystem></MassServiceSystem>
        </div>
    );
}

// function sleep(ms: number) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// interface MainState {
//     x: number;
// }

// interface MainProps {}

// export default class Index extends React.Component<MainProps, MainState> {
//     constructor(props: MainProps) {
//         super(props);

//         this.state = {
//             x: 0
//         };
//     }

//     render(): ReactNode {
//         return (
//             <div>
//                 <h1>Тест</h1>
//                 <p>x = {this.state.x}</p>
//                 <p>
//                     Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                     Temporibus, aut. Suscipit aut pariatur at et obcaecati,
//                     maiores ad velit assumenda adipisci nihil, blanditiis facere
//                     perspiciatis expedita natus porro debitis similique!
//                 </p>
//             </div>
//         );
//     }

//     async run() {
//         while (1) {
//             console.log("x");

//             this.setState({
//                 x: this.state.x + 1
//             });
//             await sleep(1000);
//         }
//     }

//     componentDidMount(): void {
//         this.run();
//     }
// }
