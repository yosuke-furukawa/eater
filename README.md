Eater
===============
[![Build Status](https://travis-ci.org/yosuke-furukawa/eater.svg?branch=master)](https://travis-ci.org/yosuke-furukawa/eater)
[![Coverage Status](https://coveralls.io/repos/github/yosuke-furukawa/eater/badge.svg?branch=master)](https://coveralls.io/github/yosuke-furukawa/eater?branch=master)

Eater is *Ea*sy *t*est runn*er*.
Eater has one simple rule.

```
If test file outputs `stderr` message, the test failed.
```

#How to use

## 1. Install

```
$ npm install eater -g
```

## 2. Write some tests

```js
// test/sometest.js
const assert = require('assert');
assert(1 === 2); // always failure
```

## Run

```
$ eater
```

## If you are power-assert user

1. install power-assert and espower-loader

```
$ npm install eater -D
$ npm install power-assert espower-loader -D
```

2. enable power-assert

```js
// script/enable-power-assert.js
require('espower-loader')({
    cwd: process.cwd(),
    pattern: 'test/**/*.js'
});
```

3. run test with require

```
$ node --require ./script/enable-power-assert.js node_modules/eater/bin/eater.js
```

## Coverage

1. install nyc instead of istanbul

```
$ npm install nyc -D
```

2. run test with nyc

```
$ nyc eater
```
