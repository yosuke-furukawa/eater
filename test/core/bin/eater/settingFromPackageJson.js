const cp = require('child_process');
const assert = require('power-assert');

const result = cp.spawnSync('node',`
  --require ./test/package/mockPackageJson.js ${process.cwd()}/bin/eater.js --dir test/fixture/ --ext success.js
`.trim().split(' '));
console.log(result.stdout.toString());
