'use strict';

class Runner {
  static test(message, check) {
    process.send && process.send({ type: 'testname', testName: message });
    const checkPromise = new Promise(check);
    checkPromise.then((v) => {
      process.send && process.send({ type: 'success', testName: message });
    }).catch((e) => {
      if (e && e.stack) console.error(`${e.stack}`);
      else console.error(`${e}`);

      process.send && process.send({ type: 'failure', testName: message });
    });
  }
}

module.exports = Runner;
