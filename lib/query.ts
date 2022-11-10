export default class Query {
    creationTime: number;
    volume: number;
    executionStartTime: number;
    executionFinishTime: number;

    constructor(creationTime: number, volume: number) {
        this.creationTime = creationTime;
        this.volume = volume;

        this.executionStartTime = 0;
        this.executionFinishTime = 0;
    }
}
