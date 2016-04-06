'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function listupFiles(dir, extention) {
  if (typeof dir !== 'string') {
    throw new Error('dir should be string');
  }

  if (typeof extention !== 'string') {
    throw new Error('extension should be string');
  }

  let files = [];
  const testDir = fs.readdirSync(dir);
  testDir.forEach((file) => {
    file = `${dir}/${file}`;
    if (fs.statSync(file).isDirectory()) {
      files = files.concat(listupFiles(file, extention));
    } else {
      if (!file.endsWith(extention)) {
        return;
      }
      files.push(file);
    }
  });
  return files;
};
