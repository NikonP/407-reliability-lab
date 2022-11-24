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
                <Link
                    className="button"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                    href="/"
                >
                    <Icon.Home size={16} /> Главная
                </Link>
                <Link
                    className="button button-outline"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                    href="/dist"
                >
                    <Icon.BarChart2 size={16} /> Распределения
                </Link>
                <Link
                    className="button button-outline"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                    href="/simulation"
                >
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
