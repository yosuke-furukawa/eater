const cp = require('child_process');
const assert = require('power-assert');
const Reporter = require(`${process.cwd()}`).Reporter;

const result = cp.execSync(`${process.cwd()}/bin/eater.js --reporter ${process.cwd()}/test/reporter/DotReporter  --dir test/fixture/ --ext success.js`).toString();


assert(result.trim() === '.');

