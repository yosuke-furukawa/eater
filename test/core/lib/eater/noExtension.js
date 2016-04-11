const assert = require('power-assert');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: (child) => {
    // do nothing
  },
  reportFileNumber: (num) => {
    // do nothing
  },
  reportSuccess: (name) => {
    assert(name === './test/fixture/success.js');
  },
  reportFinish: (hasAnyError) => {
    assert(!hasAnyError);
  }
};
const eater = new Eater(mockReporter, 'test/core');
eater.files = ['./test/fixture/success.js'];

eater.eat();


