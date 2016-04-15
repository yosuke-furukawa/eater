#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var mode = argv.mode || 'default';
var reporter = argv.reporter;
var dir = argv.dir || 'test/';
var ext = argv.ext || '.js';
var procs = Number(argv.procs) || 0;
var help = argv.help || argv.h;
var version = argv.version || argv.v;

function showHelp() {
  console.log(`
    eater [--dir test directroy default 'test/'] [--ext test file extension default '.js'] [--mode test report mode] [--reporter fooreporter] [--procs max process number default cpu core num]
    eater --dir test/lib
    eater --dir spec --ext .js --mode tap
    eater --dir test/lib --ext .test.js --mode tap
    eater --dir test/lib --ext .test.js --reporter SomeCustomReporter
    eater --dir test/lib --ext .test.js --procs 10
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

const eater = new Eater({
  reporter: new Reporter(),
  dir: dir,
  ext: ext,
  procs: procs,
});
eater.eat();

eater.on('err', () => {
  process.exit(1);
});
