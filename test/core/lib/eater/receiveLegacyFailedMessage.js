'use strict';
const assert = require('power-assert');
const mustCall = require('must-call');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: mustCall((child) => {
    // do nothing
  }),
  reportTestName: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]legacyFailedRunner\.js/));
  }),
  reportSubTestName: mustCall((name, parent) => {
    assert(name === 'explicitly fail');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]legacyFailedRunner\.js/));
  }),
  reportSubFailure: mustCall((name, parent, out, error) => {
    assert(name === 'explicitly fail');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]legacyFailedRunner\.js/));
    assert(error.match(/Subtest failed message/));
  }),
  reportFailure: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]legacyFailedRunner\.js/));
  }),
};
const eater = new Eater({
  reporter: mockReporter,
  dir: 'test/core',
  ext: '.nosuchfiles',
});
eater.nextTest('./test/fixture/legacyFailedRunner.js');

