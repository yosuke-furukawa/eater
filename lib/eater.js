'use strict';
const path = require('path');
const listupFiles = require('./listupFiles');
const arraysToArgs = require('./arraysToArgs');
const forkTest = require('./forkTest');
const EventEmitter = require('events').EventEmitter;
const DEFAULT_MAXPROCS = require('os').cpus().length;

class Eater extends EventEmitter {
  constructor(options) {
    super();
    this.reporter = options.reporter;
    this.dir = options.dir;
    this.extension = options.ext || '.js';
    this.glob = options.glob;
    this.procs = options.procs || DEFAULT_MAXPROCS;
    this.targets = options.targets || [];
    if (this.targets.length === 0) {
      this.files = listupFiles(this.dir, this.extension, this.glob);
    } else {
      this.files = this.targets;
    }
    this.fileNum = this.files.length;
    this.requires = options.requires || [];
    this.finishedFiles = [];
    this.errors = {};
    this.hasAnyError = false;
  }

  eat() {
    this.reporter.reportFileNumber(this.fileNum);
    const currentFiles = this.files.splice(0, this.procs);
    this.on('next', this.nextTest);
    currentFiles.forEach((file) => this.emit('next', file));
  }

  nextTest(file) {
    this.reporter.reportTestName(file);
    const args = arraysToArgs(this.requires, 'require');
    args.unshift('--require', path.join(__dirname, 'abortPromiseException'));
    const child = forkTest(file, {silent: true, execArgv: args});
    this.reporter.setChildProc(child);
    child.on('message', (m) => {
      if (m.type === 'failure') {
        this.reporter.reportSubFailure(m.testName, file, m.out, m.error);
        this.errors[`${file} - ${m.testName}`] = m.error;
      } else if (m.type === 'success') {
        this.reporter.reportSubSuccess(m.testName, file, m.out);
      } else if (m.type === 'testname') {
        this.reporter.reportSubTestName(m.testName, file);
      }
    });
    child.on('success', (out) => {
      this.reporter.reportSuccess(file, out);
    });
    child.on('failure', (out, error) => {
      this.reporter.reportFailure(file, out, error);
      this.hasAnyError = true;
      this.errors[file] = error;
    });
    child.on('close', () => {
      this.finishedFiles.push(file);
      if (this.files.length > 0) {
        this.emit('next', this.files.shift());
      } else {
        if (this.finishedFiles.length === this.fileNum) {
          if (this.hasAnyError) {
            setImmediate(() => {
              this.emit('err', this.hasAnyError, this.errors);
            });
          }
          this.reporter.reportFinish(this.hasAnyError, this.errors);
        }
      }
    });
  }
}

module.exports = Eater;
