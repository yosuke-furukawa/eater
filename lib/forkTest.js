'use strict';
const cp = require('child_process');

function forkTest(file, opts) {

  let hasErr = false;

  const child = cp.fork(file, opts);

  let out = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (data) => {

    out += data;

  });

  let error = '';
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (data) => {

    hasErr = true;
    error += data;

  });
  child.on('close', () => {

    if (hasErr) {

      child.emit('failure', out, error);

    } else {

      child.emit('success', out);

    }

  });

  return child;

}

module.exports = forkTest;
