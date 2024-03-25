/*!
 * lstat | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/lstat
*/
'use strict';

const fsLstat = require('fs').lstat;
const {inspect} = require('util');

module.exports = function lstat(...args) {
  const argLen = args.length;

  return new Promise((resolve, reject) => {
    if (argLen !== 1) {
      throw new TypeError(`Expected 1 argument (string), but got ${
        argLen === 0 ? 'no' : argLen
      } arguments instead.`);
    }

    const [path] = args;

    if (typeof path !== 'string') {
      throw new TypeError(`Expected a file path (string), but got a non-string value ${inspect(path)}.`);
    }

    if (path.length === 0) {
      throw new Error('Expected a file path, but got \'\' (empty string).');
    }

    fsLstat(path, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};
