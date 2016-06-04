'use strict';
const Reporter = require('../../').Reporter;

class EsModuleReporter extends Reporter {
  reportFileNumber(num) {
  }
  reportTestName(name) {
  }
  setChildProc(child) {
    child.stdout.on('data', () => {process.stdout.emit('data', '')});
    child.stderr.on('data', () => {process.stderr.emit('data', '')});
  }
  reportFailure(name) {
    console.log('x');
  }
  reportSuccess(name) {
    console.log('o');
  }
}

Object.defineProperty(module.exports, "__esModule", { value: true });
module.exports.default = EsModuleReporter;
