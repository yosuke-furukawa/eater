const cp = require('child_process');
const assert = require('power-assert');

const resultRequireBabel = cp.spawnSync('node', [`${process.cwd()}/bin/eater.js`, '--require', './test/enable-babel.js', 'test/fixture/babel/failed.js' ]);

console.log(resultRequireBabel.stdout.toString())

assert(resultRequireBabel.stdout.toString().match(/false == true/));
