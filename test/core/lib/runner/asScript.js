const cp = require('child_process');
const assert = require('power-assert');

const runner = cp.spawnSync("node", [`${process.cwd()}/test/fixture/runner.js`]);
assert(runner.stdout.toString().match(/success: assert truthy/));

const failedRunner = cp.spawnSync("node", [`${process.cwd()}/test/fixture/failedRunner.js`]);
assert(failedRunner.stdout.toString().match(/failure: assert falsy/));
assert(failedRunner.stderr.toString().match(/1 Subtest\(s\) failed/));
