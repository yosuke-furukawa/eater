const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');
const mustCall = require('must-call');

test('assert truthy', (done) => {
  console.log('assert truthy');
  assert(true);
  done();
});


test('assert truthy async', (done) => {
  setTimeout(mustCall(() => {
    console.log('assert truthy async');
    assert(true); 
    done();
  }), 2000);
});


test('assert truthy async2', (done, fail) => {
  setTimeout(mustCall(() => {
    console.log('assert truthy async2');
    assert(true); 
    done();
  }), 1000);
});


