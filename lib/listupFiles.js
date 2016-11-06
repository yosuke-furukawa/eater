'use strict';
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const EATER_ONLY = 'eater:only';

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

  let files = [];

  if (globPattern) {

    files = glob.sync(globPattern);

  } else {

    const testDir = fs.readdirSync(dir);
    testDir.forEach((f) => {

      const file = path.join(dir, f);
      if (fs.statSync(file).isDirectory()) {

        files = files.concat(listupFiles(file, extention));

      } else {

        if (!file.endsWith(extention)) {

          return;

        }
        files.push(file);

      }

    });

  }

  let onlyTest = null;
  files.forEach((file) => {

    const content = fs.readFileSync(file, 'utf-8');
    if (content.indexOf(EATER_ONLY) >= 0) {

      onlyTest = file;

    }

  });

  if (onlyTest) {

    files = [onlyTest];

  }

  return files;

};
