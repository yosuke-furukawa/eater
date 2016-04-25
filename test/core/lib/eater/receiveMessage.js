const assert = require('power-assert');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: (child) => {
    // do nothing
  },
  reportTestName: (name) => {
    // do nothing
  },
  reportSubTestName: (name, parent) => {
    assert(parent === './test/fixture/runner.js');
    assert(name === 'assert truthy');
  },
  reportSuccess: (name) => {
    assert(name === './test/fixture/runner.js');
  },
  reportSubSuccess: (name) => {
    assert(name === 'assert truthy');
  },
};
const eater = new Eater({
  reporter: mockReporter, 
  dir: 'test/core', 
  ext: '.nosuchfiles',
});
eater.nextTest('./test/fixture/runner.js');
