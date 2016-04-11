'use strict';
const colo = require('colo');

class Reporter {
  reportFileNumber(num) {
    console.log(colo.cyan(`Test File Num : ${num}`));
  }
  reportTestName(name) {
    console.log(`Test Name : ${name}`);
  }
  setChildProc(child) {
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }
  reportFailure(name) {
    console.log(`${colo.red('✗ failure: ')} ${name}`);
  }
  reportSuccess(name) {
    console.log(`${colo.green('✓ success: ')} ${name}`);
  }
  reportFinish(hasAnyError, errors) {
  }
}

module.exports = Reporter;
