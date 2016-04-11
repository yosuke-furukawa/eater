'use strict';
const assert = require('power-assert');

describe('hogehoge', () => {
  beforeEach(() => {
    console.log('beforeEach');
  });
  afterEach(() => {
    console.log('afterEach');
  });
  it('should be true', () => {
    assert(true);
  });
  it('should be async', (done) => {
    setTimeout(() => {
      console.log('async!');
      assert(true);
      done();
    }, 1000);
  });
  it('should be async2', (done) => {
    setTimeout(() => {
      console.log('async2!');
      assert(true);
      done();
    }, 1000);
  });
  it('should be sync', () => {
    setTimeout(() => {
      console.log('sync!');
      assert(true);
    }, 1000);
    assert(true);
  });
});
