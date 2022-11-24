import { useEffect, useState } from "react";

import DistTest from "./DistTest";
import Model from "./Model";

interface MSSProps {}

interface DistData {
    count: number;
    rangeStart: number;
    rangeEnd: number;
}

export default function MassServiceSystem({}: MSSProps) {
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

            <div>
                <Model></Model>
            </div>
        </>
    );
}
