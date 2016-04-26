const cp = require('child_process');
const assert = require('power-assert');
const colo = require('colo');
const Reporter = require(`${process.cwd()}`).Reporter;

const result = cp.execSync(`${process.cwd()}/bin/eater.js test/fixture/success.js test/fixture/test/a.js`).toString();

assert(result.match(/success!!/));
assert(result.match(/test\/fixture\/success\.js/));
assert(result.match(/hogehoge/));
assert(result.match(/test\/fixture\/test\/a\.js/));
