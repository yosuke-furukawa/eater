const test = require(`${process.cwd()}/lib/runner`).test;
const mustCall = require('must-call');
const assert = require('power-assert');

test('sync', () => {
  assert(true);
});

test('async', () =>{
  setImmediate(mustCall(() => {
    assert(true);
  }));
});
