const cp = require('child_process');
const assert = require('power-assert');

const resultRequireBabel = cp.execSync(`
  ${process.cwd()}/bin/eater.js --require espower-babel/guess --dir test/fixture/babel --ext assert.js --mode tap
`).toString();

assert(resultRequireBabel.indexOf(`1..1`) !== -1);
