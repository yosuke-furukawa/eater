const test = require(`${process.cwd()}/lib/runner`).test;
const assert = require('power-assert');
const mustCall = require('must-call');

test('assert truthy', () => {
  console.log('assert truthy');
  assert(true);
});


test('assert truthy async', () => {
  setTimeout(mustCall(() => {
    console.log('assert truthy async');
    assert(true); 
  }), 200);
});


test('assert truthy async2', () => {
  setTimeout(mustCall(() => {
    console.log('assert truthy async2');
    assert(true); 
  }), 100);
});


