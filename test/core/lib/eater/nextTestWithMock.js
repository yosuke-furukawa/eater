const cp = require('child_process');
const mustCall = require('must-call');
const assert = require('power-assert');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockFork = () => {
  return {
    stdout: {
      setEncoding() {},
      on: () => {
        // do nothing
      }
    },
    stderr: {
      setEncoding() {},
      on: () => {
        // do nothing
      }
    },
    on: (m, cb) => {
      if (m === 'message') {
        cb({ type: 'testname', testName: 'test' });
        cb({ type: 'success', testName: 'test' });
        cb({ type: 'failure', testName: 'test' });
        cb({ type: 'nosuchtype', testName: 'test' });
      }
    }
  };
};
cp.fork = mockFork;
const mockReporter = {
  setChildProc: (child) => {
    // do nothing
  },
  reportTestName: () => {
    // do nothing
  },
  reportSubTestName: mustCall((name, parent) => {
    assert(name === 'test');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]success\.js/));
  }),
  reportSubSuccess: mustCall((name, parent) => {
    assert(name === 'test');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]success\.js/));
  }),
  reportSubFailure: mustCall((name, parent) => {
    assert(name === 'test');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]success\.js/));
  }),
};
const eater = new Eater({
  reporter: mockReporter,
  dir: 'test/core',
  ext: '.nosuchfiles',
});
eater.files = ['./test/fixture/success.js'];
eater.nextTest('./test/fixture/success.js');



