'use strict';
const cp = require('child_process');

function forkTest(file, opts) {
  let hasErr = false;
  let error = '';

  const child = cp.fork(file, opts);
  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (data) => {
    hasErr = true;
    error += data;
  });
  child.on('close', () => {
    if (hasErr) {
      child.emit('failure', error);
    } else {
      child.emit('success');
    }
  });

  return child;
}

module.exports = forkTest;
