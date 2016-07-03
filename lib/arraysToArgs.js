'use strict';
module.exports = (arrays, key) => {
  const results = [];
  arrays.forEach((item) => {
    results.push(`--${key}`);
    results.push(item);
  });
  return results;
};
