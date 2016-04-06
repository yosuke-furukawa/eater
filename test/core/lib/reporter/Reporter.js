const assert = require('power-assert');
const Reporter = require(`${process.cwd()}/lib/reporter/Reporter`);
const reporter = new Reporter();

console.log = (message) => {
  assert(message.indexOf('Test File Num : 123') !== -1);
};

reporter.reportFileNumber(123);

console.log = (message) => {
  assert(message.indexOf('Test Name : foobarbuz') !== -1);
};

reporter.reportTestName('foobarbuz');


console.log = (message) => {
  assert(message.indexOf('failure') !== -1);
  assert(message.indexOf('foobarbuz') !== -1);
};

reporter.reportFailure('foobarbuz');

console.log = (message) => {
  assert(message.indexOf('success') !== -1);
  assert(message.indexOf('hogefuga') !== -1);
};

reporter.reportSuccess('hogefuga');


const child = {
  stdout: {
    pipe: (obj) => {
      assert.deepEqual(obj, process.stdout);
    }
  },
  stderr: {
    pipe: (obj) => {
      assert.deepEqual(obj, process.stderr);
    }
  },
};
reporter.setChildProc(child);
