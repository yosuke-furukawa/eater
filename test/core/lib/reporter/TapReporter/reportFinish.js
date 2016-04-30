const assert = require('power-assert');
const TapReporter = require(`${process.cwd()}/lib/reporter/TapReporter`);
const reporter = new TapReporter();

reporter.reportFileNumber(3);
reporter.reportSuccess('test1');
reporter.reportSuccess('test2');
reporter.reportFailure('test3');
console.log = (message) => {
  assert(message === 'FAILED tests 3\nFailed 1/3, 33.33% okay');
};
reporter.reportFinish(true);
