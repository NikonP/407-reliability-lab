import Link from "next/link";
import React from "react";
import MassServiceSystem from "../components/MassServiceSystem";
import * as Icon from "react-feather";
import DistTest from "../components/DistTest";

export default function Home() {
    return (
        <div className="container">
            {/* <Example delay={100}></Example> */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link className="button" href="/">
                    <Icon.Home size={16} /> Главная
                </Link>
                <Link className="button button-outline" href="/dist">
                    <Icon.BarChart2 size={16} /> Распределения
                </Link>
                <Link className="button button-outline" href="/simulation">
                    <Icon.Cpu size={16} /> Симуляция
                </Link>
            </div>
            <div>
                <h1>Надежность и качество информационных систем</h1>
                <h2>Лабораторная работа "Система массового обслуживания"</h2>
                <blockquote>&copy; Никон Подгорный, ПетрГУ 22407</blockquote>
            </div>
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
