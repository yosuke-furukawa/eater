const assert = require('power-assert');

function testRejectPromise() {
  return Promise.reject(new Error('Error Promise'));
}
const promise = testRejectPromise();
setTimeout(() => {promise.catch(); }, 100);
process.on('uncaughtException', (e) => {
  assert(e.message === 'Error Promise');
});

process.on('rejectionHandled', (p) => {
  p.catch((e) => {
    assert(e.message === 'Error Promise');
  });
});


