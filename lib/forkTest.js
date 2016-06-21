'use strict';
const cp = require('child_process');

function forkTest(file, opts) {
  let hasErr = false;

  const child = cp.fork(file, opts);
  child.error = '';
  child.out = '';
  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', (data) => {
    child.out += data;
  });
  child.stderr.on('data', (data) => {
    hasErr = true;
    child.error += data;
  });
  child.on('close', () => {
    if (hasErr) {
      child.emit('failure', error);
    } else {
      child.emit('success', out);
    }
  });

  return child;
}

module.exports = forkTest;
