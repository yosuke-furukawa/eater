'use strict';
const colo = require('colo');

class Reporter {
  constructor() {
    this.exectimeMap = new Map();
  }
  reportFileNumber(num) {
    console.log(colo.cyan(`Test File Num : ${num}`));
    this.exectimeMap.set('total', Date.now());
  }
  reportTestName(name) {
    console.log(colo.grey(`Testing... : ${name}`));
    this.exectimeMap.set(name, Date.now());
  }
  reportSubTestName(name, parent) {
    console.log(colo.cyan.bold(`  Test Name : ${name} in ${parent}`));
    this.exectimeMap.set(`${name} - ${parent}`, Date.now());
  }
  setChildProc(child) {
    child.stdout.pipe(process.stdout);
  }
  reportSubFailure(name, parent, error) {
    const start = this.exectimeMap.get(`${name} - ${parent}`);
    console.log(`${colo.red.bold('  ✗ failure: ')} ${name} ${Date.now() - start} ms`);
  }
  reportSubSuccess(name, parent) {
    const start = this.exectimeMap.get(`${name} - ${parent}`);
    console.log(`${colo.green.bold('  ✓ success: ')} ${name} ${Date.now() - start} ms`);
  }
  reportFailure(name, error) {
    const start = this.exectimeMap.get(`${name}`);
    console.log(`${colo.red('✗ failure: ')} ${name} ${Date.now() - start} ms`);
  }
  reportSuccess(name) {
    const start = this.exectimeMap.get(`${name}`);
    console.log(`${colo.green('✓ success: ')} ${name} ${Date.now() - start} ms`);
  }
  reportFinish(hasAnyError, errors) {
    const start = this.exectimeMap.get('total');
    const keys = Object.keys(errors);
    if (keys.length) {
      console.log(`\n\n${colo.red.bold('ALL FAILURES:')}`);
      keys.forEach((key) => {
        console.log(`${colo.bold(key)}\n${errors[key]}`);
      });
    }
    console.log(`Total duration time: ${colo.blue.bold((Date.now() - start) + 'ms')}`);
  }
}

module.exports = Reporter;
