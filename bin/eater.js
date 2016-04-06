#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var mode = argv.mode || 'default';
var dir = argv.dir || 'test/';
var ext = argv.ext || '.js';
var help = argv.help;
var version = argv.version || argv.v;

if (help) {
  console.log(`
    eater [--dir test directroy default 'test/'] [--ext test file extension default '.js'] [--mode test report mode]
    eater --dir test/lib
    eater --dir spec --ext .js --mode tap
    eater --dir test/lib --ext .test.js --mode tap
  `);
  process.exit(0);
}

if (version) {
  console.log(require('../package.json').version);
  process.exit(0);
}

var Eater = require('../lib/eater');
var Reporter = require('../lib/reporter/Reporter');
if (mode === 'tap') {
  Reporter = require('../lib/reporter/TapReporter');
}

const eater = new Eater(new Reporter(), dir, ext);
eater.eat();

eater.on('err', () => {
  process.exit(1);
});
