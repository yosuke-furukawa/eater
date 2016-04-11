'use strict';
const Reporter = require('../../').Reporter;

class DotReporter extends Reporter {
  reportFileNumber(num) {
  }
  reportTestName(name) {
  }
  setChildProc(child) {
    child.stdout.on('data', () => {process.stdout.emit('data', '')});
    child.stderr.on('data', () => {process.stderr.emit('data', '')});
  }
  reportFailure(name) {
    console.log('F');
  }
  reportSuccess(name) {
    console.log('.');
  }
}

module.exports = DotReporter;
