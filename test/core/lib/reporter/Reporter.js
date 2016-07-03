const assert = require('power-assert');
const Reporter = require(`${process.cwd()}/lib/reporter/Reporter`);
const reporter = new Reporter();

console.log = (message) => {
  assert(message.indexOf('Test File Num : 123') !== -1);
};

reporter.reportFileNumber(123);

console.log = (message) => {
  assert(message.indexOf('Testing... : foobarbuz') !== -1);
};

reporter.reportTestName('foobarbuz');


console.log = (message) => {
  assert(message.indexOf('Test Name : foobarbuz in parent') !== -1);
};

reporter.reportSubTestName('foobarbuz', 'parent');

console.log = (message) => {
  assert(message.indexOf('Test Name : foobarbuz in parent 2nd') !== -1);
};

reporter.reportSubTestName('foobarbuz', 'parent');

console.log = (message) => {
  assert(message.indexOf('failure') !== -1);
  assert(message.indexOf('foobarbuz') !== -1);
};

reporter.reportFailure('foobarbuz');

console.log = (message) => {
  assert(message.indexOf('no-such-failure-test') !== -1);
  assert(message.indexOf('failure') !== -1);
};

reporter.reportFailure('no-such-failure-test');

console.log = (message) => {
  assert(message.indexOf('failure') !== -1);
  assert(message.indexOf('foobarbuz') !== -1);
  assert(message.indexOf('out') !== -1);
  assert(message.indexOf('error') !== -1);
};

reporter.reportFailure('foobarbuz', 'out', 'error');

console.log = (message) => {
  assert(message.indexOf('success') !== -1);
  assert(message.indexOf('hogefuga') !== -1);
};

reporter.reportSuccess('hogefuga');

console.log = (message) => {
  assert(message.indexOf('failure') !== -1);
  assert(message.indexOf('foobarbuz') !== -1);
  assert(message.indexOf('parent') !== -1);
  assert(message.indexOf('out') !== -1);
  assert(message.indexOf('error') !== -1);
};

reporter.reportSubFailure('foobarbuz', 'parent', 'out', 'error');

console.log = (message) => {
  assert(message.indexOf('failure') !== -1);
  assert(message.indexOf('foobarbuz') !== -1);
  assert(message.indexOf('parent') !== -1);
};

reporter.reportSubFailure('foobarbuz', 'parent');

console.log = (message) => {
  assert(message.indexOf('failure') !== -1);
  assert(message.indexOf('foobarbuz2') !== -1);
  assert(message.indexOf('parent') !== -1);
};

reporter.reportSubFailure('foobarbuz2', 'parent');

console.log = (message) => {
  assert(message.indexOf('success') !== -1);
  assert(message.indexOf('hogefuga') !== -1);
};

reporter.reportSubSuccess('hogefuga');

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

console.log = (message) => {
  assert(message.indexOf('Total duration time:') !== -1);
};
reporter.reportFinish(false, []);
