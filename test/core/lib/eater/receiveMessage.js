'use strict';
const assert = require('power-assert');
const mustCall = require('must-call');
const Eater = require(`${process.cwd()}/lib/eater`);
const mockReporter = {
  setChildProc: mustCall((child) => {
    // do nothing
  }),
  reportTestName: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]runner\.js/));
  }),
  reportSubTestName: mustCall((name, parent) => {
    assert(parent.match(/.[/\\]test[/\\]fixture[/\\]runner\.js/));
    assert(name === 'assert truthy');
  }),
  reportSubSuccess: mustCall((name) => {
    assert(name === 'assert truthy');
  }),
  reportSuccess: mustCall((name) => {
    assert(name.match(/.[/\\]test[/\\]fixture[/\\]runner\.js/));
  }),
};
const eater = new Eater({
  reporter: mockReporter, 
  dir: 'test/core', 
  ext: '.nosuchfiles',
});
eater.nextTest('./test/fixture/runner.js');
