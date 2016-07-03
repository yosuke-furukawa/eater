Eater
===============
[![npm version](https://badge.fury.io/js/eater.svg)](https://badge.fury.io/js/eater)
[![Build Status](https://travis-ci.org/yosuke-furukawa/eater.svg?branch=master)](https://travis-ci.org/yosuke-furukawa/eater)
[![Coverage Status](https://coveralls.io/repos/github/yosuke-furukawa/eater/badge.svg?branch=master)](https://coveralls.io/github/yosuke-furukawa/eater?branch=master)

![logo](https://github.com/yosuke-furukawa/eater/raw/master/images/eater.png)

Eater is **Ea** sy **t** est runn **er** .
Eater has one simple rule.

```
If test file outputs `stderr` message, the test failed.
```

#Features

- Multi-process: All eater test files run as separate processes and eater does not launch too many processes more than CPU-core number.
- Easy mock: An eater test does not affect the other tests, but mock object sometimes kills your test.
- Happy async: eater aims is here to handle async test well. Each eater files will run in `Node.js` child_process, so the tests always should be async first. If your tests mix sync and async tests, you will have a headache to maintain the tests.

# [Demo](https://github.com/yosuke-furukawa/eater-demo)


![demo](https://github.com/yosuke-furukawa/eater-demo/raw/master/images/eater-demo.gif)

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

![image](https://github.com/yosuke-furukawa/eater/raw/master/images/screenshot.png)

## eater `--dir` and `--ext` and `--glob`

eater searches JavaScript files under `process.cwd()/test` dir by default. If you want to change the dir, use `--dir` option.

```
$ eater --dir spec/
```

And if you changed test file extension, like `.jsx/.es6/.test.js`, you use `--ext` option.

```
$ eater --ext jsx
```

eater can find test files using glob pattern match. you use `--glob` option.

```
$ eater --glob **/__test/**/*.js
```

### file

```
$ eater test/sometest.js test/foo.js test/bar.jd
```

## If you are [power-assert](https://github.com/power-assert-js/power-assert) user

### 1. install `power-assert` and `espower-loader`

```
$ npm install eater -D
$ npm install power-assert espower-loader -D
```

### 2. enable `power-assert`

```js
// script/enable-power-assert.js
require('espower-loader')({
    cwd: process.cwd(),
    pattern: 'test/**/*.js'
});
```

### 3. run tests with `--require`

```
$ eater --require ./script/enable-power-assert.js
```

![power-assert](https://github.com/yosuke-furukawa/eater/raw/master/images/powerassert.png)

## If you are babel(JSX) user

### 1. install `babel-register` or `active-cache-babel-register`

```
$ npm install eater -D
$ npm install babel-register -D
```

or

```
$ npm install eater -D
$ npm install active-cache-babel-register -D
```

Note: [active-cache-babel-register](https://github.com/yosuke-furukawa/active-cache-babel-register) improves babel  transpilation performance. 

### 2. enable `babel`

```js
// script/enable-babel.js
require('babel-register')({ // or to use require('active-cache-babel-register')
  ignore: (file) => {
    if (file.match(/node_modules/)) return true;
    return false;
  }
});
```

### 3. run tests with `--require`

```
$ eater --require ./script/enable-babel.js
```

## if you are power-assert and babel user:

### 1. install babel-preset-power-assert

```
$ npm install babel-preset-power-assert -D
```

### 2. write your .babelrc

```
{
  "presets": ["es2015", "babel-preset-power-assert"]
}
```

### 3. run tests with `--require`

```
$ eater --require ./script/enable-babel.js
```

## Coverage

### 1. install nyc instead of istanbul

```
$ npm install nyc -D
```

### 2. run test with nyc

```
$ nyc eater
```

## eater runner settings

eater reads the arguments from settings.

- package.json
- .eaterrc

### package.json

```js
{
  "name": "eaterDemo",
  "version": "1.0.0",
  "scripts": {
    "test": "eater"
  },
  "eater": {
    "dir": "test/core",
    "require": [
      "./enable-power-assert.js",
      "./enable-jsx.js"
    ]
  }
}
```

### .eaterrc

.eaterrc is JSON5 format so you can write comment and trailing commas.

```js
{
  dir: "test/core",
  require: [
    "./enable-power-assert.js",
    "./enable-jsx.js",
  ],
}
```

### runner

If you would like to use test runner, eater has `test` function.

```js
const calc = require('../foo/bar/calc');
const test = require('eater/runner').test;
const assert = require('assert');

test('give 2 arguments return sum', () => {
  const result = calc.sum(1, 2);
  assert(result === 3);
});

test('give 2 arguments return sum on async', () => {
  const result = calc.sumAsync(1, 2);
  result.then((value) => {
    assert(value === 3)
  });
});
```

Note that each subtests also run as separated processes,
you don't have to care about sync/async stuff.

# Use custom reporter

```
$ npm install eater-pacman-reporter
$ eater --reporter eater-pacman-reporter
```

![pacman](https://raw.githubusercontent.com/yosuke-furukawa/eater-pacman-reporter/master/images/pacman.gif)

## Custom Reporters

- [eater-tap-reporter](https://npmjs.com/package/eater-tap-reporter)
- [eater-pacman-reporter](https://npmjs.com/package/eater-pacman-reporter)
- [eater-b-reporter](https://npmjs.com/package/eater-b-reporter)
