function Task(isAsync=false) {
	this.isAsync = isAsync;
	if (isAsync) this.done = function(){};
}


function PauseTask() {
    Task.call(this, true);
}


function WaitTask(time) {
	Task.call(this, true);
	gsap.delayedCall(time, ()=>this.done());
}


function FuncTask({func, args=[], isAsync=false}) {
	Task.call(this, isAsync);	
	func.bind(this)(...args);
}


