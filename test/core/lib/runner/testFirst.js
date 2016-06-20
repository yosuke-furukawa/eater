const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');
const mustCall = require('must-call');

process.env.EATER_SUBTEST = '0';

test('first', mustCall(() => {
  assert(true);
}));

test('second', () => {
  assert(false);
});
