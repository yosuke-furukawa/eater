const cp = require('child_process');
const assert = require('power-assert');

const result = cp.execSync(`node ${process.cwd()}/bin/eater.js --pattern **/__test__/**/*.js`).toString();
assert(result.match(/test[\\/]fixture[\\/]__test__[\\/]b.js/));
