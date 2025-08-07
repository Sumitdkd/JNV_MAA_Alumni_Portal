export const encodePromptComponent = (prompt) => composeStringOperations(encodeURIComponent, replaceMissingChars, decodeSpaces)(prompt);
const charsMissingFromUrlEncode = /[!'()*~_.-]/g;
const missingCharsMap = {
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
const replaceMissingChars = (str) => {
    return str.replace(charsMissingFromUrlEncode, (match) => { var _a; return (_a = missingCharsMap[match]) !== null && _a !== void 0 ? _a : match; });
};
const decodeSpaces = (str) => str.replace(/%20/g, ' ');
const composeStringOperations = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);
