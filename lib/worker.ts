export default class Worker {
    queue: Array<any>;
    speed: number;

    constructor(speed: number) {
        this.speed = speed;
        this.queue = [];
    }
}
