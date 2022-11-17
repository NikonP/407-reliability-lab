import { useState } from "react";
import * as Icon from "react-feather";
import SystemWorker from "../lib/worker";

interface ModelProps {}

export default function Model({}: ModelProps) {
    const [avgQueryT, setAvgQueryT] = useState(10);
    const [avgQueryTSigma, setAvgQueryTSigma] = useState(3);

    const [avgQueryD, setAvgQueryD] = useState(10);

    const [workersCount, setWorkersCount] = useState(2);

    const [workers, setWorkers] = useState(new Array<SystemWorker>());

    return (
        <>
            <h2>Модель</h2>

            <label htmlFor="m_avgt">Среднее время запроса</label>
            <input id="m_avgt" type="number" value={avgQueryT}></input>

            <label htmlFor="m_sigma">σ</label>
            <input id="m_sigma" type="number" value={avgQueryTSigma}></input>

            <label htmlFor="m_avgd">Средняя задержка между запросами</label>
            <input id="m_avgd" type="number" value={avgQueryD}></input>

            <label htmlFor="m_wc">Количество пунктов обработки</label>
            <input id="m_wc" type="number" value={workersCount}></input>

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
                        <div>Скорость: {w.speed}</div>
                        <button
                            onClick={() => {
                                let newWorkers = workers.filter((e) => e !== w);
                                setWorkers(newWorkers);
                            }}
                        >
                            <span>Удалить</span> <Icon.Trash2 size={"1em"} />
                        </button>
                    </blockquote>
                ))}
            </div>
        </>
    );
}
