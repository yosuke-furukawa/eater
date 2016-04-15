const assert = require('power-assert');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: (child) => {
    // do nothing
  },
  reportSuccess: (name) => {
    assert(name === './test/fixture/success.js');
  },
  reportFinish: (hasAnyError) => {
    assert(!hasAnyError);
  }
};
const eater = new Eater({
  reporter: mockReporter, 
  dir: 'test/core', 
  ext: '.nosuchfiles',
});
eater.files = ['./test/fixture/success.js'];
eater.nextTest('./test/fixture/success.js');


