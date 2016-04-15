'use strict';
const cp = require('child_process');
const listupFiles = require('./listupFiles');
const EventEmitter = require('events').EventEmitter;
const DEFAULT_MAXPROCS = require('os').cpus().length;

class Eater extends EventEmitter {
  constructor(options) {
    super();
    this.reporter = options.reporter;
    this.dir = options.dir;
    this.extension = options.ext || '.js';
    this.procs = options.procs || DEFAULT_MAXPROCS;
    this.files = listupFiles(this.dir, this.extension);
    this.fileNum = this.files.length;
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
    const child = cp.fork(file, {silent: true});
    let hasErr = false;
    this.reporter.setChildProc(child);
    let error = '';
    child.stderr.on('data', (data) => {
      hasErr = true;
      this.hasAnyError = true;
      error += data;
      this.errors[file] = error;
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
