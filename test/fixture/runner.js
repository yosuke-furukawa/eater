const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');

test('assert truthy', () => {
  assert(true);
});

