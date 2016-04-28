const cp = require('child_process');
const assert = require('power-assert');

const resultRequireBabel = cp.spawnSync(`${process.cwd()}/bin/eater.js`, ['--require', './test/enable-babel.js', 'test/fixture/babel/failed.js' ]);


assert(resultRequireBabel.stderr.toString().match(/assert\('passs' == 'pass'\)/));
