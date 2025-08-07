'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @private
 * @description Reverses the version positions, x.y.z turns to z.y.x
 *              Example: 1.2.3 -> 03.02.01
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} in the form of zz.yy.xx (
 */
function reverseVersion(semVer) {
    if (semVer.split('.').length < 2) {
        throw new Error('invalid semVer, must have at least two segments');
    }
    // Split by '.', reverse, create new array
    return semVer.split('.').reverse().join('.');
}

exports.reverseVersion = reverseVersion;
