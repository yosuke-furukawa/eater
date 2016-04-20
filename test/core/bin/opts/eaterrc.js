const opts = require(`${process.cwd()}/bin/opts`);
const assert = require('power-assert');
const path = require('path');

const argv = {
  eaterrc: path.resolve(`${__dirname}/eaterrcNormal`),
};
var result = opts(argv, {}, process.cwd());
assert.deepEqual(result.requires, ["test/fixture/success.js", "colo"]);

result = opts({}, {}, __dirname);
assert(result.mode === "tap");

result = opts({}, {}, __dirname);
assert(result.mode === "tap");
assert(result.dir === "test/core");

result = opts({}, {}, `${__dirname}/nopackage`);
assert(result.mode === 'default');
assert(result.dir === 'test/');
