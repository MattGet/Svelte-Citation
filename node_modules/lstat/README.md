# lstat

[![NPM version](https://img.shields.io/npm/v/lstat.svg)](https://www.npmjs.com/package/lstat)
[![Build Status](https://travis-ci.org/shinnn/lstat.svg?branch=master)](https://travis-ci.org/shinnn/lstat)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/lstat.svg)](https://coveralls.io/github/shinnn/lstat?branch=master)

[Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise)-based [`lstat`](http://man7.org/linux/man-pages/man2/lstat.2.html)

```javascript
const lstat = require('lstat');

lstat('/path/to/file').then(stat => {
  stat; //=> {dev: 16777220, mode: 33188, nlink: 1, uid: 501, gid: 20, ...}
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install lstat
```

## API

```javascript
const lstat = require('lstat');
```

### lstat(*path*)

*path*: `String`  
Return: `Promise<fs.Stats>`

Almost the same as the [Node.js](https://nodejs.org/) built-in [`fs.lstat`](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback), but:

* It returns [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise), instead of passing the result to its callback function.
* The first parameter does't accept `Buffer` by design. Just use `String` instead.

```javascript
lstat('/path/to/directory').then(stat => {
  stat.isDirectory(); //=> true
});

lstat('/path/to/symlink').then(stat => {
  stat.isSymbolicLink(); //=> true
});
```

## License

Copyright (c) 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
