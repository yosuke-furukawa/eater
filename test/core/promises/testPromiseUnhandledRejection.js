const assert = require('power-assert');

function testRejectPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('test'));
    }, 100);
  });
}

testRejectPromise().then(() => {
  assert('test');
}).catch((e) => {
  // failure!!!!!
  // call unhandledRejection
  assert(e.message !== 'test');
});

process.on('uncaughtException', (e) => {
  assert.ok(e);
  assert(e.stack.match(/test[/\\]core[/\\]promises[/\\]testPromiseUnhandledRejection.js/));
});

