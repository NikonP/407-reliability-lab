import { useState } from "react";
import { getRandomExp, getRandomNorm } from "../lib/randomizer";
import * as Icon from "react-feather";

import {
    LineChart,
    BarChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar
} from "recharts";

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

    const [dist, setDist] = useState("exp");
    const [count, setCount] = useState(10000);

    const [distPlot, setDistPlot] = useState(new Array<DistData>());

    const [generating, setGenerating] = useState(false);

    const generateData = () => {
        setGenerating(true);

        console.log("Generate", count);

        let intervalCount = Math.round(5 * Math.log10(count));

        let randomFunc = dist === "exp" ? getRandomExp : getRandomNorm;

        let numbers = [...Array(count)].map(() => randomFunc(100));

        let maxVal = Math.max(...numbers);
        let minVal = Math.min(...numbers);

        console.log("Interval count", intervalCount);
        console.log("min-max", minVal, maxVal);

        let step = (maxVal - minVal) / intervalCount;

        console.log("step", step);

        // let intervals = new Array<number>(intervalCount);

        let distData = new Array<DistData>();

        for (let i = 0; i < intervalCount; i++) {
            let count = numbers.filter(
                (x) => x >= step * i && x < step * (i + 1)
            ).length;

            distData.push({
                count: count,
                rangeStart: step * i,
                rangeEnd: step * (i + 1)
            });
        }

        setDistPlot(distData);
        setGenerating(false);
    };

    return (
        <div>
            <h1>Система массового обслуживания</h1>

            <div style={{}}>
                <div>
                    <select
                        onChange={(evt) => setDist(evt.target.value)}
                        value={dist}
                    >
                        <option value="exp">EXP</option>
                        <option value="norm">Norm</option>
                    </select>
                </div>

                <input
                    type="number"
                    value={count}
                    onChange={(evt) => {
                        setCount(parseInt(evt.target.value, 10));
                    }}
                ></input>

                <div>
                    <button onClick={generateData}>Сгенерировать</button>
                    {generating && (
                        <div>
                            <Icon.Loader /> <span>Генерация...</span>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <BarChart
                    width={800}
                    height={400}
                    data={distPlot.map((v) => {
                        return {
                            value: v.count,
                            name: Math.round(v.rangeEnd)
                        };
                    })}
                    barGap={0}
                    barCategoryGap={0}
                >
                    <XAxis dataKey="name" domain={["auto", "auto"]} />
                    <YAxis dataKey="value" domain={["auto", "auto"]} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Bar
                        type="monotone"
                        dataKey="value"
                        fill="#9b4dca"
                        maxBarSize={200}
                    />
                    {/* <Line type="monotone" dataKey="value" stroke="#8884d8" /> */}
                </BarChart>
            </div>
        </div>
    );
}
