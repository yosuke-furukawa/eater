'use strict';
const cp = require('child_process');
const listupFiles = require('./listupFiles');
const EventEmitter = require('events').EventEmitter;
const MAXPROCS = process.env.EATER_MAXPROCS || require('os').cpus().length;

class Eater extends EventEmitter {
  constructor(reporter, dir, extension) {
    super();
    this.reporter = reporter;
    this.dir = dir;
    this.extension = extension || '.js';
    this.files = listupFiles(this.dir, this.extension);
    this.fileNum = this.files.length;
    this.finishedFiles = [];
    this.hasAnyError = false;
  }
  
  eat() {
    this.reporter.reportFileNumber(this.fileNum);
    const currentFiles = this.files.splice(0, MAXPROCS);
    this.on('next', this.nextTest);
    currentFiles.forEach((file) => this.emit('next', file));
  }

  nextTest(file) {
    const child = cp.fork(file, {silent: true});
    let hasErr = false;
    this.reporter.setChildProc(child);
    child.stderr.on('data', () => {
      hasErr = true;
      this.hasAnyError = true;
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
        if (this.finishedFiles.length === this.fileNum && this.hasAnyError) {
          this.emit('err', this.hasAnyError);
        }
      }
    });
  }
}
  
module.exports = Eater;
