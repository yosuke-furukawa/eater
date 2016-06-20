'use strict';
const assert = require('power-assert');
const mustCall = require('must-call');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: mustCall((child) => {
    // do nothing
  }),
  reportTestName: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]legacyDoneRunner\.js/));
  }),
  reportSubTestName: mustCall((name, parent) => {
    assert(name === 'explicitly success');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]legacyDoneRunner\.js/));
  }),
  reportSubSuccess: mustCall((name, parent) => {
    assert(name === 'explicitly success');
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]legacyDoneRunner\.js/));
  }),
  reportSuccess: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]legacyDoneRunner\.js/));
  }),
};
const eater = new Eater({
  reporter: mockReporter,
  dir: 'test/core',
  ext: '.nosuchfiles',
});
eater.nextTest('./test/fixture/legacyDoneRunner.js');
