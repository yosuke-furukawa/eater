'use strict';

const assert = require('power-assert');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: (child) => {
    // do nothing
  },
  reportTestName: (name) => {
    // do nothing
  },
  reportFileNumber: (num) => {
    assert(num === 1);
  },
  reportFailure: (name) => {
    assert(name.match(/test[/\\]fixture[/\\]error\.js/));
  },
  reportFinish: (hasAnyError) => {
    assert(hasAnyError);
  }
};
const eater = new Eater({
  reporter: mockReporter, 
  dir: 'test/fixture', 
  ext: 'error.js',
});
eater.eat();
eater.on('err', (hasAnyError) => {
  assert(hasAnyError === true);
});
