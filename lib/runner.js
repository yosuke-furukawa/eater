'use strict';
const EventEmitter = require('events').EventEmitter;
const colo = require('colo');

const runEmitter = new EventEmitter();

class Runner {

  static test(message, check) {
    Runner.tasks.push({ message: message, check: check });
    if (!Runner.eaten) {
      process.nextTick(Runner.eat);
      Runner.eaten = true;
    }
  }

  static nextTest() {
    if (Runner.tasks.length === 0) {
      return;
    }
    const task = Runner.tasks.shift();
    const checkPromise = new Promise(task.check);
    checkPromise.then((v) => {
      process.send && process.send({ type: 'success', testName: task.message });
      Runner.finishedTasks.push(task.message);
      runEmitter.emit('next');
    }).catch((e) => {
      if (e && e.stack) console.error(`${e.stack}`);
      else console.error(`${colo.red.bold('Failed message: ')}${e}`);

      process.send && process.send({ type: 'failure', testName: task.message });
      Runner.finishedTasks.push(task.message);
      runEmitter.emit('next');
    });
  }

  static eat() {
    Runner.taskCount = Runner.tasks.length;
    runEmitter.on('next', Runner.nextTest);
    runEmitter.emit('next');
    process.on('exit', (code) => {
      if (Runner.finishedTasks.length < Runner.taskCount) {
        console.error(colo.red.bold('Pending test exists, but process exit'));
      }
    });
  }
  
}

Runner.eaten = false;
Runner.tasks = [];
Runner.taskCount = 0;
Runner.finishedTasks = [];

module.exports = Runner;
