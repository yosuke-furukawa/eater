const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');

test('assert falsy', (done, fail) => {
  fail('foo bar buz');
});
