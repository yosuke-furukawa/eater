'use strict';
const colo = require('colo');
const Reporter = require('./Reporter');

class TapReporter extends Reporter {
  reportFileNumber(num) {
    console.log(`1..${num}`);
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
    this.reportFailure(name);
  }
  reportSubSuccess(name) {
    this.reportSuccess(name);
  }
  reportFailure(name) {
    console.log(`not ok ${name}`);
  }
  reportSuccess(name) {
    console.log(`ok ${name}`);
  }
}

module.exports = TapReporter;
