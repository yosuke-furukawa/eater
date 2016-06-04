'use strict';
const cp = require('child_process');
const path = require('path');
const listupFiles = require('./listupFiles');
const arraysToArgs = require('./arraysToArgs');
const EventEmitter = require('events').EventEmitter;
const DEFAULT_MAXPROCS = require('os').cpus().length;

class Eater extends EventEmitter {
  constructor(options) {
    super();
    this.reporter = options.reporter;
    this.dir = options.dir;
    this.extension = options.ext || '.js';
    this.procs = options.procs || DEFAULT_MAXPROCS;
    this.targets = options.targets || [];
    if (this.targets.length === 0) {
      this.files = listupFiles(this.dir, this.extension);
    } else {
      this.files = this.targets;
    }
    this.fileNum = this.files.length;
    this.requires = options.requires || [];
    this.args = options.args || [];
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
    args.push('--require', path.join(__dirname, 'abortPromiseException'));
    const child = cp.fork(file, {silent: true, execArgv: args});
    this.reporter.setChildProc(child);
    let hasErr = false;
    let error = '';
    child.stderr.on('data', (data) => {
      hasErr = true;
      this.hasAnyError = true;
      error += data;
      this.errors[file] = error;
    });
    child.on('message', (m) => {
      if (m.type === 'failure') {
        this.reporter.reportSubFailure(m.testName, file);
      } else if (m.type === 'success') {
        this.reporter.reportSubSuccess(m.testName, file);
      } else if (m.type === 'testname') {
        this.reporter.reportSubTestName(m.testName, file);
      }
    });
    child.on('close', () => {
      if (hasErr) {
        this.reporter.reportFailure(file);
      } else {
        this.reporter.reportSuccess(file);
      }
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
