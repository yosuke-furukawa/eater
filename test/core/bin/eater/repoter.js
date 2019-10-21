const cp = require('child_process');
const assert = require('power-assert');
const colo = require('colo');
const Reporter = require(`${process.cwd()}`).Reporter;

const result = cp.execSync(`node ${process.cwd()}/bin/eater.js --reporter ${process.cwd()}/test/reporter/DotReporter  --dir test/fixture/ --ext success.js`).toString();
assert(result.trim() === '.');

const esModuleResult = cp.execSync(`node ${process.cwd()}/bin/eater.js --reporter ${process.cwd()}/test/reporter/EsModuleReporter  --dir test/fixture/ --ext success.js`).toString();
assert(esModuleResult.trim() === 'o');

const errResult = cp.spawnSync("node", [`${process.cwd()}/bin/eater.js`, "--reporter", "NotFoundReporter", "--dir", "test/fixture/", "--ext", "js"]);
assert(errResult.stderr.toString().trim().indexOf("Error: Cannot find module 'NotFoundReporter'") >= 0);
