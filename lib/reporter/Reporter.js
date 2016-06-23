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
    console.log(colo.grey.bold(`  Test Name : ${name} in ${parent}`));
    this.exectimeMap.set(`${name} - ${parent}`, Date.now());
  }
  setChildProc(child) {
  }
  reportSubFailure(name, parent, out, error) {
    const message = (out ? out + '\n' : '')  + (error || '');
    const start = this.exectimeMap.get(`${name} - ${parent}`);
    console.log(`${colo.red.bold('  ✗ failure: ')} ${name} - ${parent} ${Date.now() - start} ms\n${message}`);
  }
  reportSubSuccess(name, parent, out) {
    const message = (out ? out + '\n' : '');
    const start = this.exectimeMap.get(`${name} - ${parent}`);
    console.log(`${colo.green.bold('  ✓ success: ')} ${name} - ${parent} ${Date.now() - start} ms\n${message}`);
  }
  reportFailure(name, out, error) {
    const message = (out ? out + '\n' : '')  + (error || '');
    const start = this.exectimeMap.get(`${name}`);
    console.log(`${colo.red('✗ failure: ')} ${name} ${Date.now() - start} ms\n${message}`);
  }
  reportSuccess(name, out) {
    const message = (out ? out + '\n' : '');
    const start = this.exectimeMap.get(`${name}`);
    console.log(`${colo.green('✓ success: ')} ${name} ${Date.now() - start} ms\n${message}`);
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
