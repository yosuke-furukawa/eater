const cp = require('child_process');
const assert = require('power-assert');

const result = cp.spawnSync("node", [`${process.cwd()}/bin/eater.js`, "test/fixture/failed-pend-test.js"]);

assert(result.stderr.toString().match(/Pending test exists, but process exit/));


