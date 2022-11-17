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

    const [dist, setDist] = useState("exp");
    const [count, setCount] = useState(10000);

    const [avgT, setAvgT] = useState(100);
    const [sigma, setSigma] = useState(40);

    const [distPlot, setDistPlot] = useState(new Array<DistData>());

    const [generating, setGenerating] = useState(false);

    const generateData = () => {
        setGenerating(true);

        console.log("Generate", count);

        let intervalCount = Math.round(5 * Math.log10(count));

        let randomFunc = () => {
            if (dist === "exp") {
                return getRandomExp(avgT);
            } else {
                return getRandomNorm(avgT, sigma);
            }
        };

        let numbers = new Array<number>(count);
        for (let i = 0; i < count; i++) {
            numbers[i] = randomFunc();
        }

        // let numbers = Array.from({ length: count }, () => randomFunc(avgT)); // [...Array(count)].map(() => randomFunc(avgT));

        let maxVal = -Infinity;
        let minVal = Infinity;
        let numbersLength = numbers.length;

        for (let i = 0; i < numbersLength; i++) {
            maxVal = Math.max(maxVal, numbers[i]);
            minVal = Math.min(minVal, numbers[i]);
        }

        // let maxVal = Math.max.apply(null, numbers);
        // let minVal = Math.min.apply(null, numbers);

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
        <>
            <h1>Система массового обслуживания</h1>

            <span>Тик: {tick}</span>

            <div>
                <h2>Тест распределения</h2>
                <div>
                    <div>
                        <label htmlFor="dist_type">Вид распределения</label>
                        <select
                            id="dist_type"
                            onChange={(evt) => setDist(evt.target.value)}
                            value={dist}
                        >
                            <option value="exp">
                                Экспоненциальное распределение
                            </option>
                            <option value="norm">
                                Нормальное распределение
                            </option>
                        </select>
                    </div>

                    <label htmlFor="count_input">Количество элементов</label>
                    <input
                        id="count_input"
                        type="number"
                        value={count}
                        onChange={(evt) => {
                            setCount(parseInt(evt.target.value, 10));
                        }}
                        placeholder="Количество элементов"
                        title="Количество элементов"
                    ></input>

                    <label htmlFor="avgt_input">Среднее время</label>
                    <input
                        id="avgt_input"
                        type="number"
                        value={avgT}
                        onChange={(evt) => {
                            setAvgT(parseInt(evt.target.value, 10));
                        }}
                        placeholder="Среднее время"
                        title="Среднее время"
                    ></input>

                    {dist === "norm" && (
                        <>
                            <label htmlFor="avgt_input">σ</label>
                            <input
                                id="sigma_input"
                                type="number"
                                value={sigma}
                                onChange={(evt) => {
                                    setSigma(parseInt(evt.target.value, 10));
                                }}
                                placeholder="Сигма"
                                title="Сигма"
                            ></input>
                        </>
                    )}

                    <div>
                        <button onClick={generateData}>Сгенерировать</button>
                        {generating && (
                            <div>
                                <Icon.Loader /> <span>Генерация...</span>
                            </div>
                        )}
                    </div>
                </div>

                {distPlot.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={distPlot.map((v) => {
                                return {
                                    value: v.count,
                                    name: v.rangeEnd.toFixed(2)
                                };
                            })}
                            barGap={0}
                            barCategoryGap={0}
                        >
                            <Tooltip />
                            <XAxis dataKey="name" domain={["auto", "auto"]} />
                            <YAxis dataKey="value" domain={["auto", "auto"]} />
                            <CartesianGrid
                                stroke="#eee"
                                strokeDasharray="5 5"
                            />
                            <Bar
                                type="monotone"
                                dataKey="value"
                                fill="#9b4dca"
                                maxBarSize={200}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div>
                        <Icon.ArrowUp /> Нажми сгенерировать
                    </div>
                )}
            </div>

            <Model></Model>
        </>
    );
}
