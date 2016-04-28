const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');
const mustCall = require('must-call');

test('assert truthy', (done) => {
  assert(true);
  // not call done, the test goes pending...
});


test('assert truthy async', (done) => {
  setTimeout(mustCall(() => {
    console.log('assert truthy async');
    assert(true); 
    done();
  }), 2000);
});

