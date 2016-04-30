'use strict';
const colo = require('colo');
const Reporter = require('./Reporter');
const TAP_VERSION = 13;
var count = 0;
var failedTests = [];
var totalNum = 0;

class TapReporter extends Reporter {
  reportFileNumber(num) {
    console.log(`TAP version ${TAP_VERSION}\n1..${num}`);
    totalNum = num;
  }
  reportTestName(name) {
    // Do nothing
  }
  reportSubTestName(name, parent) {
    // Do nothing
  }
  setChildProc(child) {
    child.stdout.on('data', () => {process.stdout.emit('data', '')});
    child.stderr.on('data', () => {process.stderr.emit('data', '')});
  }
  reportSubFailure(name) {
    // Do nothing
  }
  reportSubSuccess(name) {
    // Do nothing
  }
  reportFailure(name) {
    count++;
    failedTests.push(count);
    console.log(`not ok ${count} ${name}`);
  }

  reportSuccess(name) {
    count++;
    console.log(`ok ${count} ${name}`);
  }

  formatFloat(num, n) {
    return Math.floor((num * Math.pow(10, n))) / Math.pow(10, n);
  }

  reportFinish(hasAnyError, errors) {
    if (hasAnyError) {
      console.log(`FAILED tests ${failedTests.join(', ')}
Failed ${failedTests.length}/${totalNum}, ${this.formatFloat(failedTests.length/totalNum * 100, 2)}% okay`);
    }
  }
}

module.exports = TapReporter;
