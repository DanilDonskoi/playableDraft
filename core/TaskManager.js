class TaskManager {
    constructor(isLoop = false) {
        this.tasks = [];
        this.args = [];
        this.currId = 0;
        this.isLoop = isLoop;
        this.currentTask = null;
    }

    add(task, ...args) {
        this.tasks.push(task);
        this.args.push(args);
    }

    start() {
        this.next();
    }

    next() {
        if (this.currId >= this.tasks.length) {
            this.currId = 0;
            if (!this.isLoop) return;
        }

        let TaskClass = this.tasks[this.currId];
        let args = this.args[this.currId];
        this.currentTask = new TaskClass(...args);

        this.currId++;

        if (this.currentTask.isAsync) {
            this.currentTask.done = () => this.next();
        } else {
            this.next();
        }
    }

    reset() {
        this.currId = 0;
    }

    goto(idx, autoStart = true) {
        if (this.currentTask) {
            this.currentTask.done = () => {};
        }
        this.currId = idx;
        if (autoStart) {
            this.next();
        }
    }

    clear() {
        this.currId = 0;
        this.tasks = [];
        this.args = [];
        this.isLoop = false;
    }
}