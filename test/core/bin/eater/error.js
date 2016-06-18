const cp = require('child_process');
const assert = require('power-assert');

const result = cp.spawnSync("node", [`${process.cwd()}/bin/eater.js`, "--dir", "test/fixture/", "--ext", "error.js"]);

assert(result.stderr.toString().indexOf('Error!!!!!') !== -1);

