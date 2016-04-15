const assert = require('power-assert');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: (child) => {
    // do nothing
  },
  reportFailure: (name) => {
    assert(name === './test/fixture/error.js');
  },
  reportFinish: (hasAnyError) => {
    assert(hasAnyError);
  }
};
const eater = new Eater({
  reporter: mockReporter, 
  dir: 'test/core', 
  ext: '.nosuchfiles', 
});
eater.nextTest('./test/fixture/error.js');
