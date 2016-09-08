const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');
const mustCall = require('must-call');
const ENV = 'test';

assert(process.env.NODE_ENV === ENV)

test('assert process.env.NODE_ENV is test', () => {
  assert(process.env.NODE_ENV === ENV)
});

