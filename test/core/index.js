const assert = require('power-assert');
const eater = require(`${process.cwd()}`);
const Eater = require(`${process.cwd()}/lib/eater`);
const Reporter = require(`${process.cwd()}/lib/reporter/Reporter`);

assert(eater.Eater === Eater);
assert(eater.Reporter === Reporter);
