// __eater:only__
const only = require(`${process.cwd()}/lib/runner`).only;
const test = require(`${process.cwd()}/lib/runner`).test;
const mustCall = require('must-call');
const assert = require('power-assert');

test('this test should not execute', (_, fail) =>{
  fail('should not be executed');
});

only('only is executed', () => {
  assert(true);
});

