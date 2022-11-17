import Link from "next/link";
import React from "react";
import MassServiceSystem from "../components/MassServiceSystem";
import * as Icon from "react-feather";
import Model from "../components/Model";

export default function Simulation() {
    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link className="button button-outline" href="/">
                    <Icon.BarChart2 size={16} /> Распределения
                </Link>
                <Link className="button" href="/simulation">
                    <Icon.Cpu size={16} /> Симуляция
                </Link>
            </div>
            <Model></Model>
        </div>
    );
}
