import Link from "next/link";
import React from "react";
import MassServiceSystem from "../components/MassServiceSystem";
import * as Icon from "react-feather";
import DistTest from "../components/DistTest";

export default function Dist() {
    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link
                    className="button button-outline"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                    href="/"
                >
                    <Icon.Home size={16} /> Главная
                </Link>
                <Link
                    className="button"
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
            <DistTest></DistTest>
        </div>
    );
}
