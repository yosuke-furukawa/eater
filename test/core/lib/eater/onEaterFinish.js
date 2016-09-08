'use strict';
const assert = require('power-assert');
const mustCall = require('must-call');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: (child) => {
    // do nothing
  },
  reportFileNumber: () => {
    // do nothing
  },
  reportTestName: (name) => {
    // do nothing
  },
  reportSubTestName: (name, parent) => {
    // do nothing
  },
  reportSubSuccess: (name) => {
    // do nothing
  },
  reportFinish: (name) => {
    // do nothing
  },
  reportSuccess: (name) => {
    // do nothing
  },
};
const eater = new Eater({
  reporter: mockReporter, 
  dir: 'test/fixture', 
  ext: 'success.js',
});
eater.eat();

process.on('eater:finish', mustCall((hasAnyError) => {
  assert(!hasAnyError);
}));

