const cp = require('child_process');
const assert = require('power-assert');

const result = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require test/fixture/success.js --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`).toString();

assert(result.match(/success!!/));
assert(result.match(/1\.\.1/));
assert(result.match(/ok 1 test\/fixture\/success\.js/));

const hasDotResult = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require ./test/fixture/success.js --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`).toString();

assert(hasDotResult.match(/success!!/));
assert(hasDotResult.match(/1\.\.1/));
assert(hasDotResult.indexOf(`ok 1 test/fixture/success.js`) !== -1);

const withoutJSResult = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require test/fixture/success --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`).toString();

assert(withoutJSResult.match(/success!!/));
assert(withoutJSResult.match(/1\.\.1/));
assert(withoutJSResult.indexOf(`ok 1 test/fixture/success.js`) !== -1);

const coloResult = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require colo --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`).toString();

assert(coloResult.indexOf(`1..1`) !== -1);
assert(coloResult.indexOf(`ok 1 test/fixture/success.js`) !== -1);

