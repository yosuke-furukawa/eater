const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');

test('explicitly success', (done) => {
  done();
  assert(false); // not affect
});

