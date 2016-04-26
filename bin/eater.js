#!/usr/bin/env node

const minimist = require('minimist');
const execArgv = minimist(process.execArgv);
const argv = minimist(process.argv.slice(2));
const existsSync = require('exists-sync');
const path = require('path');
const opts = require('./opts')(argv, execArgv, process.cwd());

function showHelp() {
  console.log(`
    eater [--dir test directroy default 'test/'] [--ext test file extension default '.js'] [--mode test report mode] [--reporter fooreporter] [--procs max process number default cpu core num] [--require prerequire modules]
    eater --dir test/lib
    eater --dir spec --ext .js --mode tap
    eater --dir test/lib --ext .test.js --mode tap
    eater --dir test/lib --ext .test.js --reporter SomeCustomReporter
    eater --dir test/lib --ext .test.js --procs 10
    eater --require foo/bar
    eater --eaterrc example/dir/.eaterrc
    eater test/foo.js test/bar.js test/buz.js
  `);
  process.exit(0);
}

if (opts.help) {
  showHelp();
}

if (opts.version) {
  const pack = require('../package.json');
  console.log(pack.version);
  process.exit(0);
}

var requires = opts.requires;

requires = requires.map((r, i) => {
  const isLocalFile = existsSync(r) || existsSync(r + '.js');
  const file = isLocalFile ? path.resolve(r) : r;
  require(file);
  return file;
});

const Eater = require('../lib/eater');
const eater = new Eater({
  reporter: new opts.Reporter(),
  dir: opts.dir,
  ext: opts.ext,
  procs: opts.procs,
  requires: requires,
  targets: opts.targets,
});
eater.eat();

eater.on('err', () => {
  process.exit(1);
});
