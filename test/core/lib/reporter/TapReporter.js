const assert = require('power-assert');
const TapReporter = require(`${process.cwd()}/lib/reporter/TapReporter`);
const reporter = new TapReporter();

console.log = (message) => {
  assert(message === 'TAP version 13\n1..123');
};

reporter.reportFileNumber(123);

console.log = (message) => {
  assert.ifError('Should not be reached here');
};

reporter.reportTestName('foobarbuz');

console.log = (message) => {
  assert.ifError('Should not be reached here');
};

reporter.reportSubTestName('foobarbuz');

console.log = (message) => {
  assert(message.indexOf('not ok') !== -1);
  assert(message.indexOf('foobarbuz') !== -1);
};

reporter.reportFailure('foobarbuz');

console.log = (message) => {
  assert(message.indexOf('ok') !== -1);
  assert(message.indexOf('hogefuga') !== -1);
};

reporter.reportSuccess('hogefuga');

console.log = (message) => {
  assert(message.indexOf('not ok') !== -1);
  assert(message.indexOf('foobarbuz') !== -1);
};

reporter.reportSubFailure('foobarbuz');

console.log = (message) => {
  assert(message.indexOf('ok') !== -1);
  assert(message.indexOf('hogefuga') !== -1);
};

reporter.reportSubSuccess('hogefuga');

const child = {
  stdout: {
    on: (type, func) => {
      assert(type === 'data');
      func();
    },
    pipe: (obj) => {
      assert.ifError('Should not be reached here');
    }
  },
  stderr: {
    on: (type, func) => {
      assert(type === 'data');
      func();
    },
    pipe: (obj) => {
      assert.ifError('Should not be reached here');
    }
  },
};
reporter.setChildProc(child);

