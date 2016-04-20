const cp = require('child_process');
const assert = require('power-assert');
const colo = require('colo');
const Reporter = require(`${process.cwd()}`).Reporter;

const result = cp.execSync(`${process.cwd()}/bin/eater.js --reporter ${process.cwd()}/test/reporter/DotReporter  --dir test/fixture/ --ext success.js`).toString();
assert(result.trim() === '.');

const errResult = cp.spawnSync(`${process.cwd()}/bin/eater.js`, ["--reporter", "NotFoundReporter", "--dir", "test/fixture/", "--ext", "js"]);
assert(errResult.stderr.toString().trim() === colo.red.bold("Error: Cannot find module 'NotFoundReporter'"));
