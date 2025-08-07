'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description Contains functions that decide whether to keep the content of the extracted area, or to replace it with a mask.
 * @namespace Extract
 * @memberOf Qualifiers
 * @see Visit {@link Actions.Effect|Effect Action} for an example
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.Extract
 */
function content() {
    return 'content';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Extract
 */
function mask() {
    return 'mask';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Extract
 */
var ExtractMode = {
    content: content,
    mask: mask
};

exports.ExtractMode = ExtractMode;
exports.content = content;
exports.mask = mask;
