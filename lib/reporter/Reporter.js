'use strict';
const colo = require('colo');

class Reporter {
  reportFileNumber(num) {
    console.log(colo.cyan(`Test File Num : ${num}`));
  }
  reportTestName(name) {
    console.log(colo.grey(`Testing... : ${name}`));
  }
  reportSubTestName(name, parent) {
    console.log(colo.cyan.bold(`  Test Name : ${name} in ${parent}`));
  }
  setChildProc(child) {
    //child.stdout.pipe(process.stdout);
  }
  reportSubFailure(name, parent, out, error) {
    out && console.log(out);
    error && console.log(error);
    console.log(`${colo.red.bold('  ✗ failure: ')} ${name}`);
  }
  reportSubSuccess(name, parent, out) {
    error && console.log(error);
    console.log(`${colo.green.bold('  ✓ success: ')} ${name}`);
  }
  reportFailure(name, out, error) {
    out && console.log(out);
    error && console.log(error);
    console.log(`${colo.red('✗ failure: ')} ${name}`);
  }
  reportSuccess(name, out) {
    out && console.log(out);
    console.log(`${colo.green('✓ success: ')} ${name}`);
  }
  reportFinish(hasAnyError, errors) {
    const keys = Object.keys(errors);
    if (keys.length) {
      console.log(`\n\n${colo.red.bold('ALL FAILURES:')}`);
      keys.forEach((key) => {
        console.log(`${colo.bold(key)}\n${errors[key]}`);
      });
    }
  }
}

module.exports = Reporter;
