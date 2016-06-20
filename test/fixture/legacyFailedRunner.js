const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');

test('explicitly fail', (done, fail) => {
  fail();
});
