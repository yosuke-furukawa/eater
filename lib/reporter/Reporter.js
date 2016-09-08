'use strict';
const colo = require('colo');
const ordinalize = require('../ordinalize');
const TOTAL = Symbol('eater.total');

class Reporter {
  constructor() {

    this.exectimeMap = new Map();
    this.successCount = 0;
    this.subSuccessCount = 0;
    this.failureCount = 0;
    this.subFailureCount = 0;

  }
  reportFileNumber(num) {

    console.log(colo.cyan.bold(`Test File Num : ${num}`));
    this.exectimeMap.set(TOTAL, {start: Date.now()});

  }
  reportTestName(name) {

    console.log(colo.grey.bold(`Testing... : ${name}`));
    this.exectimeMap.set(name, {start: Date.now()});

  }
  reportSubTestName(name, parent) {

    const key = `${name} - ${parent}`;
    const value = this.exectimeMap.get(key);
    const num = (value && ordinalize(value.num + 1)) || '';
    console.log(colo.grey(`  Test Name : ${name} in ${parent} ${num}`));
    this.exectimeMap.set(key, {start: Date.now(), num: value ? value.num + 1 : 1});

  }
  setChildProc(child) { // eslint-disable-line no-unused-vars
  }
  reportSubFailure(name, parent, out, error) {

    const key = `${name} - ${parent}`;
    const value = this.exectimeMap.get(key);
    const message = (out ? out + '\n' : '') + (error || '');
    const start = (value && value.start) || Date.now();
    const num = (value && value.num > 1 && ordinalize(value.num)) || '';
    console.log(`${colo.red('  ✗ failure: ')}${num} ${name} - ${parent} ${Date.now() - start} ms\n${message}`);
    this.subFailureCount++;

  }
  reportSubSuccess(name, parent, out) {

    const key = `${name} - ${parent}`;
    const value = this.exectimeMap.get(key);
    const message = (out ? out + '\n' : '');
    const start = (value && value.start) || Date.now();
    const num = (value && value.num > 1 && ordinalize(value.num)) || '';
    console.log(`${colo.green('  ✓ success: ')}${num} ${name} - ${parent} ${Date.now() - start} ms\n${message}`);
    this.subSuccessCount++;

  }
  reportFailure(name, out, error) {

    const message = (out ? out + '\n' : '') + (error || '');
    const value = this.exectimeMap.get(name);
    const start = (value && value.start) || Date.now();
    console.log(`${colo.red.bold('✗ failure: ')} ${name} ${Date.now() - start} ms\n${message}`);
    this.failureCount++;

  }
  reportSuccess(name, out) {

    const message = (out ? out + '\n' : '');
    const value = this.exectimeMap.get(name);
    const start = (value && value.start) || Date.now();
    console.log(`${colo.green.bold('✓ success: ')} ${name} ${Date.now() - start} ms\n${message}`);
    this.successCount++;

  }
  reportFinish(hasAnyError, errors) {

    const start = this.exectimeMap.get(TOTAL).start;
    const keys = Object.keys(errors);
    if (keys.length) {

      console.log(`\n\n${colo.red.bold('ALL FAILURES:')}`);
      keys.forEach((key) => {

        console.log(`${colo.bold(key)}\n${errors[key]}`);

      });

    }
    console.log(
      `${colo.green.bold('✓ Total success count: ' + this.successCount)}\n` +
      `${this.subSuccessCount ? colo.green('  ✓ Total sub success count: ' + this.subSuccessCount) + '\n' : ''}` +
      `${this.failureCount ? colo.red.bold('✗ Total failure count: ' + this.failureCount) + '\n' : ''}` +
      `${this.subFailureCount ? colo.red('  ✗ Total sub failure count: ' + this.subFailureCount) + '\n' : ''}` +
      `Total duration time: ${colo.cyan.bold((Date.now() - start) + 'ms')}`
    );

  }
}

module.exports = Reporter;
