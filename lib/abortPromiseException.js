'use strict';
process.on('unhandledRejection', (e) => {
  throw e;
});
