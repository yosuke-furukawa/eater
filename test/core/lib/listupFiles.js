const assert = require('power-assert');
const listupFiles = require(`${process.cwd()}/lib/listupFiles`);

const lists = listupFiles('./test/fixture', '.js');
assert(lists.length > 0);
assert(lists.indexOf('test/fixture/test/a.js') !== -1);
assert(lists.indexOf('test/fixture/test/aaa/bbb/ccc/b.js') !== -1);
assert(lists.indexOf('test/fixture/test/aaa/bbb/c.js') !== -1);
assert(lists.indexOf('test/fixture/test/aaa/bbb/c.test.js') !== -1);

const listTestJsFiles = listupFiles('test/fixture', '.test.js');
assert(listTestJsFiles.length === 1);
assert(listTestJsFiles.indexOf('test/fixture/test/aaa/bbb/c.test.js') !== -1);

assert.throws(() => {
  listupFiles('./test/fixture');
}, /extension should be string/ );

assert.throws(() => {
  listupFiles(null, '.js');
}, /dir should be string/ );
