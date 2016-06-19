'use strict';
const existsSync = require('exists-sync');
const path = require('path');
const colo = require('colo');
const fs = require('fs');
const JSON5 = require('json5');

const opts = (argv, execArgv, cwd) => {
  const eaterrcFile = argv.eaterrc || path.join(cwd, '.eaterrc');
  var eaterrc = {};
  if (existsSync(eaterrcFile)) {
    eaterrc = JSON5.parse(fs.readFileSync(eaterrcFile).toString());
  }
  if (existsSync(`${cwd}/package.json`)) {
    const eaterPackage = require(`${cwd}/package.json`).eater || {};
    eaterrc = Object.assign(eaterrc, eaterPackage);
  }
  var reporter = argv.reporter || eaterrc.reporter;
  var dir = argv.dir || eaterrc.dir || 'test/';
  var ext = argv.ext || eaterrc.ext || '.js';
  var glob = argv.glob || eaterrc.glob;
  var procs = Number(argv.procs) || Number(eaterrc.procs) || 0;
  var requires = argv.require || eaterrc.require || [];
  var execRequires = execArgv.require || [];
  var help = argv.help || argv.h;
  var version = argv.version || argv.v;
  var targets = argv._;

  var Reporter = require('../lib/reporter/Reporter');

  if (reporter) {
    try {
      const obj = require(reporter);
      Reporter = obj && obj.__esModule ? obj['default'] : obj;
    } catch(e) {
      console.error(colo.red.bold(e.toString()));
      process.exit(1);
    }
  }

  if (!Array.isArray(requires)) {
    requires = [requires];
  }
  if (!Array.isArray(execRequires)) {
    execRequires = [execRequires];
  }

  Array.prototype.push.apply(requires, execRequires);

  return {
    dir: dir,
    ext: ext,
    glob: glob,
    procs: procs,
    help: help,
    version: version,
    Reporter: Reporter,
    requires: requires,
    targets: targets,
  };
};

module.exports = opts;
