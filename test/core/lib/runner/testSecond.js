const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');
const mustCall = require('must-call');

process.env.EATER_SUBTEST = '1';

test('first', () => {
  assert(false);
});

test('second', mustCall(() => {
  assert(true);
}));
