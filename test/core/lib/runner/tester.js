const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');

test('assert truthy', (done) => {
  assert(true);
  done();
});

