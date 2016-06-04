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
    assert(name === 'assert falsy');
  },
  reportFailure: (name) => {
    assert(name === './test/fixture/failedRunner.js');
  },
  reportSubFailure: (name, parent) => {
    assert(name === 'assert falsy');
    assert(parent === './test/fixture/failedRunner.js');
  },
};
const eater = new Eater({
  reporter: mockReporter,
  dir: 'test/core',
  ext: '.nosuchfiles',
});
eater.nextTest('./test/fixture/failedRunner.js');

