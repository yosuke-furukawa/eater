const ordinalize = require(`${process.cwd()}/lib/ordinalize`);
const assert = require('power-assert');

assert(ordinalize(1) === '1st');
assert(ordinalize('1') === '1st');

assert(ordinalize(2) === '2nd');
assert(ordinalize('2') === '2nd');

assert(ordinalize(3) === '3rd');
assert(ordinalize('3') === '3rd');

assert(ordinalize(4) === '4th');
assert(ordinalize('4') === '4th');

assert(ordinalize(11) === '11th');

assert(ordinalize(12) === '12th');

assert(ordinalize(13) === '13th');

assert(ordinalize(21) === '21st');
assert(ordinalize(102) === '102nd');
assert(ordinalize(1012) === '1012th');
