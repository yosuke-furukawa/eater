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
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]runnerAllSuccess\.js/));
  }),
  reportSubTestName: mustCall((name, parent) => {
    assert(name === subtestNames[subtests]);
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]runnerAllSuccess\.js/));
  }, 2),
  reportSubSuccess: mustCall((name) => {
    assert(name === subtestNames[subtests]);
    ++subtests;
  }, 2),
  reportSuccess: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]runnerAllSuccess\.js/));
  }),
};
const eater = new Eater({
  reporter: mockReporter,
  dir: 'test/core',
  ext: '.nosuchfiles',
});
eater.nextTest('./test/fixture/runnerAllSuccess.js');
