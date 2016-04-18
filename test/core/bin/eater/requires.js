const cp = require('child_process');
const assert = require('power-assert');

const result = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require test/fixture/success.js --dir test/fixture/ --ext success.js --procs 10 --mode tap
`).toString();

assert(result.indexOf(`success!!`) !== -1);
assert(result.indexOf(`1..1`) !== -1);
assert(result.indexOf(`ok test/fixture/success.js`) !== -1);

const hasDotResult = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require ./test/fixture/success.js --dir test/fixture/ --ext success.js --procs 10 --mode tap
`).toString();

assert(hasDotResult.indexOf(`success!!`) !== -1);
assert(hasDotResult.indexOf(`1..1`) !== -1);
assert(hasDotResult.indexOf(`ok test/fixture/success.js`) !== -1);

const withoutJSResult = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require test/fixture/success --dir test/fixture/ --ext success.js --procs 10 --mode tap
`).toString();

assert(withoutJSResult.indexOf(`success!!`) !== -1);
assert(withoutJSResult.indexOf(`1..1`) !== -1);
assert(withoutJSResult.indexOf(`ok test/fixture/success.js`) !== -1);

const coloResult = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require colo --dir test/fixture/ --ext success.js --procs 10 --mode tap
`).toString();

assert(coloResult.indexOf(`1..1`) !== -1);
assert(coloResult.indexOf(`ok test/fixture/success.js`) !== -1);

