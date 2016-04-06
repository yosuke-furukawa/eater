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
  setChildProc(child) {
    // Do nothing
  }
  reportFailure(name) {
    console.log(`not ok ${name}`);
  }
  reportSuccess(name) {
    console.log(`ok ${name}`);
  }
}

module.exports = TapReporter;
