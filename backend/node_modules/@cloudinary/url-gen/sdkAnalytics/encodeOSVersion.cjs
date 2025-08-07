'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkAnalytics_base64Map = require('./base64Map.cjs');
require('./stringPad.cjs');

/**
 * @private
 * @description Encodes a semVer-like version string for OS
 * @param {string} semVer Input is x.y
 * @return {string} A string built from 2 characters of the base64 table that encode the semVer
 */
function encodeOSVersion(semVer) {
    var _a = semVer.split('.'), major = _a[0], minor = _a[1];
    //convert to binary
    var binaryMajorVersion = parseInt(major).toString(2);
    var binaryMinorVersion = parseInt(minor).toString(2);
    //pad to 6
    var paddedMajor = binaryMajorVersion.padStart(6, '0');
    var paddedMinor = binaryMinorVersion.padStart(6, '0');
    return sdkAnalytics_base64Map.base64Map[paddedMajor] + sdkAnalytics_base64Map.base64Map[paddedMinor];
}

exports.encodeOSVersion = encodeOSVersion;
