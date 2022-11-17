import { useEffect, useState } from "react";
import { getRandomExp, getRandomNorm } from "../lib/randomizer";
import * as Icon from "react-feather";

import {
    LineChart,
    BarChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import Model from "./Model";
import DistTest from "./DistTest";

interface MSSProps {}

interface DistData {
    count: number;
    rangeStart: number;
    rangeEnd: number;
}

export default function MassServiceSystem({}: MSSProps) {
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setValue([...values.slice(-10), getRandomExp(10)]);
    //     }, 500);

    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // });

    const [tick, setTick] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTick(tick + 1);
        }, 1);

        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <>
            <h1>Система массового обслуживания</h1>

            <span>Тик: {tick}</span>

            <div>
                <DistTest></DistTest>
            </div>

            <Model></Model>
        </>
    );
}
