const assert = require('power-assert');
const listupFiles = require(`${process.cwd()}/lib/listupFiles`);

const lists = listupFiles('./test/fixture', '.js');
assert(lists.length > 0);
assert(lists.some((file) => file.match(/test[/\\]fixture[/\\]test[/\\]a\.js/)));
assert(lists.some((file) => file.match(/test[/\\]fixture[/\\]test[/\\]aaa[/\\]bbb[/\\]ccc[/\\]b\.js/)));
assert(lists.some((file) => file.match(/test[/\\]fixture[/\\]test[/\\]aaa[/\\]bbb[/\\]c\.js/)));
assert(lists.some((file) => file.match(/test[/\\]fixture[/\\]test[/\\]aaa[/\\]bbb[/\\]c.test\.js/)));

const listTestJsFiles = listupFiles('test/fixture', '.test.js');
assert(listTestJsFiles.length === 1);
assert(listTestJsFiles.some((file) => file.match(/test[/\\]fixture[/\\]test[/\\]aaa[/\\]bbb[/\\]c\.test.js/)));

const listPatternMatchFiles = listupFiles('', '', '**/__test__/**/*.js');
assert(listPatternMatchFiles.length === 1);
assert(listPatternMatchFiles.some((file) => file.match(/test[/\\]fixture[/\\]__test__[/\\]b.js/)));

const listOnlyFiles = listupFiles('./test/only', '.js');
assert(listOnlyFiles.length === 1);
assert(listOnlyFiles.some((file) => file.match(/test[/\\]only[/\\]only\.js/)));

assert.throws(() => {
  listupFiles('./test/fixture');
}, /extension should be string/ );

assert.throws(() => {
  listupFiles(null, '.js');
}, /dir should be string/ );

assert.throws(() => {
  listupFiles('', '', 'test/foo/bar');
}, /glob pattern should have magic glob chars/ );
