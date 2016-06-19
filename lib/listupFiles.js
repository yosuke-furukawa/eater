'use strict';
const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = function listupFiles(dir, extention, globPattern) {
  if (typeof dir !== 'string') {
    throw new Error('dir should be string');
  }

  if (typeof extention !== 'string') {
    throw new Error('extension should be string');
  }

  if (globPattern && !glob.hasMagic(globPattern)) {
    throw new Error('glob pattern should have magic glob chars like *, ?');
  }

  if (globPattern) {
    return glob.sync(globPattern);
  }

  let files = [];
  const testDir = fs.readdirSync(dir);
  testDir.forEach((file) => {
    file = path.join(dir, file);
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
