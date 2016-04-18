const assert = require('power-assert');
const arraysToArgs = require(`${process.cwd()}/lib/arraysToArgs`);
const results = arraysToArgs([
  'foo',
  'bar',
  'buz',
], 'require');

assert.deepEqual(
  results,
  [
    '--require',
    'foo',
    '--require',
    'bar',
    '--require',
    'buz',
  ]
);

const noArgs = arraysToArgs([
], 'require');

assert.deepEqual(
  noArgs,
  []
);
