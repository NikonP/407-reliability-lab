import Query from "./query";

export default class SystemWorker {
    queue: Array<Query>;
    speed: number;
    idleTime: number;

    proccessQueriesCount: number;
    timeInQueueSum: number;
    avgQueriesInQueue: number;
    avgQueriesInQueueCounter: number;

    constructor(speed: number) {
        this.speed = speed;
        this.queue = [];
        this.idleTime = 0;
        this.proccessQueriesCount = 0;
        this.timeInQueueSum = 0;
        this.avgQueriesInQueue = 0;
        this.avgQueriesInQueueCounter = 0;
    }
}
