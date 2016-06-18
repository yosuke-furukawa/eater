const cp = require('child_process');
const assert = require('power-assert');

const result = cp.execSync(`
  node ${process.cwd()}/bin/eater.js --require test/fixture/success.js --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`.trim()).toString();

assert(result.match(/success!!/));
assert(result.match(/1\.\.1/));
assert(result.match(/ok 1 test[/\\]fixture[/\\]success\.js/));

const hasDotResult = cp.execSync(`
  node ${process.cwd()}/bin/eater.js --require ./test/fixture/success.js --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`.trim()).toString();

assert(hasDotResult.match(/success!!/));
assert(hasDotResult.match(/1\.\.1/));
assert(hasDotResult.match(/ok 1 test[/\\]fixture[/\\]success\.js/));

const withoutJSResult = cp.execSync(`
  node ${process.cwd()}/bin/eater.js --require test/fixture/success --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`.trim()).toString();

assert(withoutJSResult.match(/success!!/));
assert(withoutJSResult.match(/1\.\.1/));
assert(withoutJSResult.match(/ok 1 test[/\\]fixture[/\\]success\.js/));

const coloResult = cp.execSync(`
  node ${process.cwd()}/bin/eater.js --require colo --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`.trim()).toString();

assert(coloResult.match(/1\.\.1/));
assert(coloResult.match(/ok 1 test[/\\]fixture[/\\]success\.js/));

