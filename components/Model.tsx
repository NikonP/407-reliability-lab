import { useEffect, useState } from "react";
import * as Icon from "react-feather";
import Query from "../lib/query";
import { getRandomExp, getRandomNorm } from "../lib/randomizer";
import SystemWorker from "../lib/worker";

interface ModelProps {}

export default function Model({}: ModelProps) {
    const [avgQueryT, setAvgQueryT] = useState(1000);
    const [avgQueryTSigma, setAvgQueryTSigma] = useState(300);

    const [avgQueryD, setAvgQueryD] = useState(1000);

    const [workers, setWorkers] = useState([
        new SystemWorker(1)
        // new SystemWorker(1)
    ]);

    const [globalQueue, setGlobalQueue] = useState(new Array<Query>());

    const [tick, setTick] = useState(0);

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

            w.avgQueriesInQueueCounter += 1;
            w.avgQueriesInQueue += w.queue.length;

            if (ql > 0) {
                if (w.queue[0].executionStartTime === 0) {
                    w.queue[0].executionStartTime = tick;
                    // w.proccessQueriesCount += 1;
                    // w.avgTimeInQueue += tick / w.proccessQueriesCount;
                    // w.timeInQueueSum += w.queue[0].volume;
                    // w.proccessQueriesCount += 1;
                }
                w.queue[0].volume -= w.speed;
            } else {
                w.idleTime += 1;
            }

            if (w.queue.length > 0) {
                if (w.queue[0].volume <= 0) {
                    let query = w.queue.shift();
                    if (query !== undefined) {
                        w.proccessQueriesCount += 1;
                        w.timeInQueueSum += tick - query.creationTime;
                    }
                }
            }

            // w.queue = w.queue.filter((q) => q.volume > 0);
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
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span>Добавить пункт обработки</span>{" "}
                    <Icon.Plus size={16} />
                </div>
            </button>

            <h3>Пункты обработки</h3>

            <div className="row">
                {workers.map((w, i) => (
                    <blockquote className="column">
                        <div>Пункт обработки №{i}</div>
                        <div>Время простоя: {w.idleTime}</div>
                        <div>Обработано запросов: {w.proccessQueriesCount}</div>
                        <div>
                            Среднее время в очереди:{" "}
                            {(
                                w.timeInQueueSum / w.proccessQueriesCount
                            ).toFixed(2)}
                        </div>
                        <div>
                            Среднее количество запросов в очереди:{" "}
                            {(
                                w.avgQueriesInQueue / w.avgQueriesInQueueCounter
                            ).toFixed(2)}
                        </div>
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
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4
                                }}
                            >
                                <span>Удалить</span> <Icon.Trash2 size={16} />
                            </div>
                        </button>
                        <label>Очередь запросов</label>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 5
                            }}
                        >
                            {w.queue.map((q, i) => {
                                if (i === 0) {
                                    return (
                                        <div className="query_item query_item__active">
                                            <b>Обработка...</b>
                                            <div>
                                                Осталось: {q.volume.toFixed(2)}
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="query_item">
                                            <b>
                                                Время ожидания:{" "}
                                                {tick - q.creationTime}
                                            </b>
                                            <div>
                                                Осталось: {q.volume.toFixed(2)}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </blockquote>
                ))}
            </div>
        </>
    );
}
