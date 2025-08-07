'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var encodePromptComponent = function (prompt) { return composeStringOperations(encodeURIComponent, replaceMissingChars, decodeSpaces)(prompt); };
var charsMissingFromUrlEncode = /[!'()*~_.-]/g;
var missingCharsMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '*': '%2A',
    '~': '%7E',
    _: '%5F',
    '.': '%2E',
    '-': '%2D',
};
var replaceMissingChars = function (str) {
    return str.replace(charsMissingFromUrlEncode, function (match) { var _a; return (_a = missingCharsMap[match]) !== null && _a !== void 0 ? _a : match; });
};
var decodeSpaces = function (str) { return str.replace(/%20/g, ' '); };
var composeStringOperations = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (arg) { return fns.reduce(function (acc, fn) { return fn(acc); }, arg); };
};

exports.encodePromptComponent = encodePromptComponent;
