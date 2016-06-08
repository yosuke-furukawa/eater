const cp = require('child_process');
const assert = require('power-assert');

const result = cp.execSync(`${process.cwd()}/bin/eater.js --reporter eater-tap-reporter --dir test/fixture/ --ext success.js --procs 10`).toString();

assert(result.match(/1\.\.1/));
assert(result.match(/ok 1 test\/fixture\/success\.js/));



