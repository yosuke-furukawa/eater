const cp = require('child_process');
const assert = require('power-assert');
const p = require(`${process.cwd()}/package.json`);

const result = cp.execSync(`node ${process.cwd()}/bin/eater.js --version`).toString();
assert(result.trim() === p.version);
