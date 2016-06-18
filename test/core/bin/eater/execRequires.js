const cp = require('child_process');
const assert = require('power-assert');

const result = cp.execSync(`
  node --require ./test/fixture/success.js ${process.cwd()}/bin/eater.js --dir test/fixture/ --ext success.js --procs 10 --reporter eater-tap-reporter
`.trim()).toString();

assert(result.match(/success!!/));
assert(result.match(/1\.\.1/));
assert(result.match(/ok 1 test[/\\]fixture[/\\]success\.js/));
