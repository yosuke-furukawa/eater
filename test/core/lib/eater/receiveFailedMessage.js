'use strict';
const assert = require('power-assert');
const mustCall = require('must-call');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: mustCall((child) => {
    // do nothing
  }),
  reportTestName: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]failedRunner\.js/));
  }),
  reportSubTestName: mustCall((name, parent) => {
    assert(name === 'assert falsy');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]failedRunner\.js/));
  }),
  reportSubFailure: mustCall((name, parent) => {
    assert(name === 'assert falsy');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]failedRunner\.js/));
  }),
  reportFailure: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]failedRunner\.js/));
  }),
};
const eater = new Eater({
  reporter: mockReporter,
  dir: 'test/core',
  ext: '.nosuchfiles',
});
eater.nextTest('./test/fixture/failedRunner.js');

