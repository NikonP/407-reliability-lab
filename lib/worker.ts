import Query from "./query";

export default class SystemWorker {
    queue: Array<Query>;
    speed: number;
    idleTime: number;

    constructor(speed: number) {
        this.speed = speed;
        this.queue = [];
        this.idleTime = 0
    }
}
