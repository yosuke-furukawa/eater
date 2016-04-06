'use strict';
const cp = require('child_process');
const listupFiles = require('./listupFiles');
const EventEmitter = require('events').EventEmitter;
const MAXPROCS = require('os').cpus().length;

class Eater extends EventEmitter {
  constructor(reporter, dir, extension) {
    super();
    this.reporter = reporter;
    this.dir = dir;
    this.extension = extension || '.js';
    this.files = listupFiles(this.dir, this.extension);
  }
  
  eat() {
    this.reporter.reportFileNumber(this.files.length);
    const currentFiles = this.files.splice(0, MAXPROCS);
    this.on('next', this.nextTest);
    currentFiles.forEach((file) => this.emit('next', file));
  }

  nextTest(file) {
    const child = cp.fork(file, {silent: true});
    let hasErr = false;
    this.reporter.setChildProc(child);
    child.stderr.on('data', () => {
      if (!hasErr) {
        hasErr = true;
      }
    });
    child.on('close', () => {
      if (hasErr) {
        this.reporter.reportFailure(file);
      } else {
        this.reporter.reportSuccess(file);
      }
      if (this.files.length > 0) {
        this.emit('next', this.files.shift());
      }
    });
  }
}
  
module.exports = Eater;
