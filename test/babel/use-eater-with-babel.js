const cp = require('child_process');
const assert = require('power-assert');

const resultRequireBabel = cp.execSync(`
  node ${process.cwd()}/bin/eater.js --require ./test/enable-babel.js --dir test/fixture/babel --ext assert.js --reporter eater-tap-reporter
`.trim()).toString();

assert(resultRequireBabel.match(/1\.\.1/));
assert(resultRequireBabel.match(/ok 1 test[/\\]fixture[/\\]babel[/\\]assert\.js/));
