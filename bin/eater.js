#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var mode = argv.mode || 'default';
var reporter = argv.reporter;
var dir = argv.dir || 'test/';
var ext = argv.ext || '.js';
var help = argv.help || argv.h;
var version = argv.version || argv.v;

function showHelp() {
  console.log(`
    eater [--dir test directroy default 'test/'] [--ext test file extension default '.js'] [--mode test report mode] [--reporter fooreporter]
    eater --dir test/lib
    eater --dir spec --ext .js --mode tap
    eater --dir test/lib --ext .test.js --mode tap
    eater --dir test/lib --ext .test.js --reporter 
  `);
  process.exit(0);
}

if (help) {
  showHelp();
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

if (reporter) {
  try {
    Reporter = require(reporter);
  } catch(e) {
    console.error(e.toString());
    showHelp();
  }
}

const eater = new Eater(new Reporter(), dir, ext);
eater.eat();

eater.on('err', () => {
  process.exit(1);
});
