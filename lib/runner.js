'use strict';
const EventEmitter = require('events').EventEmitter;
const colo = require('colo');
const forkTest = require('./forkTest');

const runEmitter = new EventEmitter();

class Runner {

  static test(message, check) {

    Runner.tasks.push({message, check});
    if (!Runner.eaten) {

      process.nextTick(Runner.eat);
      Runner.eaten = true;

    }

  }

  static only(message, check) {

    Runner.onlyTask = {message, check};
    if (!Runner.eaten) {

      process.nextTick(Runner.eat);
      Runner.eaten = true;

    }

  }


  static runTest(task) {

    const checkPromise = new Promise(task.check);
    checkPromise.then(() => {

      process.exit(0);

    }).catch((e) => {

      if (e && e.stack) {

        console.error(`${e.stack}`);

      } else {

        console.error(`${colo.red.bold('Subtest failed message: ')}${e}`);

      }

    });

  }

  static nextTest(next) {

    const task = Runner.tasks[next];
    Runner.report({type: 'testname', testName: task.message});
    const child = forkTest(
      process.argv[1], {
        silent: true,
        env: Object.assign(process.env, {EATER_SUBTEST: '' + next})
      });
    child.on('success', (out) => {

      Runner.report({type: 'success', testName: task.message, out});

    });
    child.on('failure', (out, error) => {

      Runner.report({type: 'failure', testName: task.message, out, error});
      ++Runner.errorTasks;

    });
    child.on('close', () => {

      if (next + 1 < Runner.taskCount) {

        runEmitter.emit('next', next + 1);

      } else if (Runner.errorTasks) {

        console.error(colo.red.bold(`${Runner.errorTasks} Subtest(s) failed`));

      }

    });

  }

  static report(message) {

    if (process.send) {

      process.send(message);

    } else {

      console.log(`${message.type}: ${message.testName}`);

    }

  }

  static eat() {

    if (Runner.onlyTask) {

      Runner.tasks = [Runner.onlyTask];

    }
    Runner.taskCount = Runner.tasks.length;
    runEmitter.on('run', Runner.runTest);
    runEmitter.on('next', Runner.nextTest);

    if (process.env.EATER_SUBTEST) {

      const next = +(process.env.EATER_SUBTEST) || 0;
      runEmitter.emit('run', Runner.tasks[next]);

    } else {

      runEmitter.emit('next', 0);

    }

  }
}

Runner.eaten = false;
Runner.tasks = [];
Runner.onlyTask = null;
Runner.taskCount = 0;
Runner.errorTasks = 0;

module.exports = Runner;
