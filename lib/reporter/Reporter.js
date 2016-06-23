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
  }
  reportSubFailure(name, parent, out, error) {
    const message = (out ? out + '\n' : '')  + (error || '');
    console.log(`${colo.red.bold('  ✗ failure: ')} ${name}\n${message}`);
  }
  reportSubSuccess(name, parent, out) {
    console.log(`${colo.green.bold('  ✓ success: ')} ${name}`);
    out && console.log(out);
  }
  reportFailure(name, out, error) {
    const message = (out ? out + '\n' : '')  + (error || '');
    console.log(`${colo.red('✗ failure: ')} ${name}\n${message}`);
  }
  reportSuccess(name, out) {
    console.log(`${colo.green('✓ success: ')} ${name}`);
    out && console.log(out);
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
