'use strict';
const assert = require('power-assert');
const mustCall = require('must-call');
const Eater = require(`${process.cwd()}/lib/eater`);

const subtestNames = ['sync', 'async'];
let subtests = 0;

const mockReporter = {
  setChildProc: mustCall((child) => {
    // do nothing
  }),
  reportTestName: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]runnerWithFailed\.js/));
  }),
  reportSubTestName: mustCall((name, parent) => {
    assert(name === subtestNames[subtests]);
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]runnerWithFailed\.js/));
  }, 2),
  reportSubFailure: mustCall((name) => {
    assert(name === 'sync');
    ++subtests;
  }),
  reportSubSuccess: mustCall((name) => {
    assert(name === 'async');
    ++subtests;
  }),
  reportFailure: mustCall((name, out, error) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]runnerWithFailed\.js/));
    assert(error.match(/1 Subtest\(s\) failed/));
  }),
};
const eater = new Eater({
  reporter: mockReporter,
  dir: 'test/core',
  ext: '.nosuchfiles',
});
eater.nextTest('./test/fixture/runnerWithFailed.js');
