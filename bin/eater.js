#!/usr/bin/env node

const minimist = require('minimist');
const execArgv = minimist(process.execArgv);
const argv = minimist(process.argv.slice(2));
const path = require('path');
const existsSync = require('exists-sync');
var mode = argv.mode || 'default';
var reporter = argv.reporter;
var dir = argv.dir || 'test/';
var ext = argv.ext || '.js';
var procs = Number(argv.procs) || 0;
var requires = argv.require || [];
var execRequires = execArgv.require || [];
var help = argv.help || argv.h;
var version = argv.version || argv.v;

function showHelp() {
  console.log(`
    eater [--dir test directroy default 'test/'] [--ext test file extension default '.js'] [--mode test report mode] [--reporter fooreporter] [--procs max process number default cpu core num] [--require prerequire modules]
    eater --dir test/lib
    eater --dir spec --ext .js --mode tap
    eater --dir test/lib --ext .test.js --mode tap
    eater --dir test/lib --ext .test.js --reporter SomeCustomReporter
    eater --dir test/lib --ext .test.js --procs 10
    eater --require foo/bar
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

const Eater = require('../lib/eater');
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

if (!Array.isArray(requires)) {
  requires = [requires];
}
if (!Array.isArray(execRequires)) {
  execRequires = [execRequires];
}
Array.prototype.push.apply(requires, execRequires);
requires = requires.map((r, i) => {
  const isLocalFile = existsSync(r) || existsSync(r + '.js');
  const file = isLocalFile ? path.resolve(r) : r;
  require(file);
  return file;
});

const eater = new Eater({
  reporter: new Reporter(),
  dir: dir,
  ext: ext,
  procs: procs,
  requires: requires,
});
eater.eat();

eater.on('err', () => {
  process.exit(1);
});
