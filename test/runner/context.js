const colo = require('colo');

global.done = () => { };

global.describe = (message, func) => {
  console.log(colo.grey(message));
  func(global.done);
};

global.beforeEach = (func) => {
  global.beforeEachFunc = func;
};

global.afterEach = (func) => {
  global.afterEachFunc = func;
};

global.it = (message, func) => {
  console.log('  ' + colo.grey(message));
  global.beforeEachFunc && global.beforeEachFunc(global.done);
  func(global.done);
  global.afterEachFunc && global.afterEachFunc(global.done);
};

