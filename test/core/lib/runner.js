const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');
const mustCall = require('must-call');
const originalProcessSend = process.send;
const originalConsoleError = console.error;
console.error = () => {};

process.send = mustCall((obj) => {
  assert(obj.type === 'testname');
  assert(obj.testName === 'useCase truthy');
});

test('useCase truthy', (resolve, reject) => {
  assert(true);
  resolve();
});

process.send = mustCall((obj) => {
  assert(obj.type === 'testname');
  assert(obj.testName === 'useCase falsy');
});

test('useCase falsy', (resolve, reject) => {
  assert(1 === 2);
  resolve();
});

process.send = mustCall((obj) => {
  assert(obj.testName === 'throw error');
});

test('throw error', (resolve, reject) => {
  throw new Error('e');
});

process.send = mustCall((obj) => {
  assert(obj.testName === 'must call');
});

test('must call', (resolve, reject) => {
  Promise.resolve(100).then(mustCall((value) => {
    assert(value !== 100);
  })) 
});

process.send = mustCall((obj) => {
  assert(obj.testName === 'throw null');
}, 3);

test('throw null', (resolve, reject) => {
  reject(null);
});
