'use strict';

const assert = require('power-assert');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: (child) => {
    // do nothing
  },
  reportFileNumber: (num) => {
    assert(num === 1);
  },
  reportFailure: (name) => {
    assert(name === 'test/fixture/error.js');
  },
  reportFinish: (hasAnyError) => {
    assert(hasAnyError);
  }
};
const eater = new Eater(mockReporter, 'test/fixture', 'error.js');
eater.eat();
eater.on('err', (hasAnyError) => {
  assert(hasAnyError === true);
});
