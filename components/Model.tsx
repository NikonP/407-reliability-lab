import { useEffect, useState } from "react";
import * as Icon from "react-feather";
import Query from "../lib/query";
import { getRandomExp, getRandomNorm } from "../lib/randomizer";
import SystemWorker from "../lib/worker";

interface ModelProps {}

export default function Model({}: ModelProps) {
    const [avgQueryT, setAvgQueryT] = useState(1000);
    const [avgQueryTSigma, setAvgQueryTSigma] = useState(3);

    const [avgQueryD, setAvgQueryD] = useState(100);

    const [workers, setWorkers] = useState([
        new SystemWorker(1),
        new SystemWorker(1)
    ]);

    const [globalQueue, setGlobalQueue] = useState(new Array<Query>());

    const [tick, setTick] = useState(0);

    // const [nextQueryDelay, setNextQueryDelay] = useState(0);

    const [nextQueryTime, setNextQueryTime] = useState(0);

    const dispatchQueue = (queue: Array<Query>) => {
        let q = queue.shift();
        let workersCopy = [...workers];

        while (q) {
            let minI = -1;
            let minQ = Infinity;
            for (let i = 0; i < workers.length; i++) {
                if (workers[i].queue.length < minQ) {
                    minQ = workers[i].queue.length;
                    minI = i;
                }
            }

            if (minI >= 0) {
                let workerI = { ...workersCopy[minI] };
                workerI.queue.push(q);
                workersCopy[minI] = workerI;
            }

            q = queue.shift();
        }

        setWorkers(workersCopy);
    };

    const processWorkers = () => {
        let workersCopy = [...workers];
        for (let w of workersCopy) {
            let ql = w.queue.length;

            if (ql > 0) {
                if (w.queue[0].executionStartTime === 0) {
                    w.queue[0].executionStartTime = tick;
                }
                w.queue[0].volume -= w.speed;
            } else {
                w.idleTime += 1;
            }

            w.queue = w.queue.filter((q) => q.volume > 0);
        }

        setWorkers(workersCopy);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTick(tick + 1);

            dispatchQueue(globalQueue);
            processWorkers();
        }, 1);

        if (tick >= nextQueryTime) {
            console.log("new query", nextQueryTime);

            setGlobalQueue([
                ...globalQueue,
                new Query(tick, getRandomNorm(avgQueryT, avgQueryTSigma))
            ]);

            setNextQueryTime(tick + getRandomExp(avgQueryD));
        }

        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <>
            <h2>Модель</h2>

            <span>Время: {tick}</span>

            <label htmlFor="m_avgt">Среднее время запроса</label>
            <input
                id="m_avgt"
                type="number"
                value={avgQueryT}
                onChange={(evt) => setAvgQueryT(parseInt(evt.target.value))}
            ></input>

            <label htmlFor="m_sigma">σ</label>
            <input
                id="m_sigma"
                type="number"
                value={avgQueryTSigma}
                onChange={(evt) =>
                    setAvgQueryTSigma(parseInt(evt.target.value))
                }
            ></input>

            <label htmlFor="m_avgd">Средняя задержка между запросами</label>
            <input
                id="m_avgd"
                type="number"
                value={avgQueryD}
                onChange={(evt) => setAvgQueryD(parseInt(evt.target.value))}
            ></input>

            <button
                onClick={() => {
                    console.log("Add worker");

                    setWorkers([...workers, new SystemWorker(1)]);
                }}
            >
                <span>Добавить пунт обработки</span> <Icon.Plus size={"1em"} />
            </button>

            <h3>Пункты обработки</h3>

            <div className="row">
                {workers.map((w, i) => (
                    <blockquote className="column">
                        <div>Пунт обработки №{i}</div>
                        <div>Время простоя: {w.idleTime}</div>
                        <div>
                            <label>Скорость обработки</label>
                            <input
                                type="number"
                                placeholder="Скорость"
                                value={w.speed}
                                style={{ width: 140 }}
                                onChange={(e) => {
                                    let workersCopy = [...workers];
                                    let workerI = { ...workersCopy[i] };
                                    workerI.speed = parseInt(e.target.value);
                                    if (workerI.speed <= 0) {
                                        workerI.speed = 1;
                                    }
                                    workersCopy[i] = workerI;
                                    setWorkers(workersCopy);
                                }}
                            ></input>
                        </div>
                        <button
                            onClick={() => {
                                let newWorkers = workers.filter((e) => e !== w);
                                setWorkers(newWorkers);
                                setGlobalQueue([...globalQueue, ...w.queue]);
                            }}
                        >
                            <span>Удалить</span> <Icon.Trash2 size={"1em"} />
                        </button>
                        <ul>
                            {w.queue.map((q, i) => {
                                if (i === 0) {
                                    return (
                                        <li className="button button-outline">
                                            {q.volume}
                                        </li>
                                    );
                                } else {
                                    return <li>{q.volume}</li>;
                                }
                            })}
                        </ul>
                    </blockquote>
                ))}
            </div>
        </>
    );
}
