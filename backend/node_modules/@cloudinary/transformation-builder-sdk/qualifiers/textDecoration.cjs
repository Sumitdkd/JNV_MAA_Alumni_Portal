'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description Contains functions to select the text decoration to be used with text.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
 * @memberOf Qualifiers
 * @namespace TextDecoration
 * @see To be used with {@link Qualifiers.TextStyle|Text Style}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextDecoration
 */
function normal() {
    return '';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextDecoration
 */
function underline() {
    return 'underline';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextDecoration
 */
function strikethrough() {
    return 'strikethrough';
}
var TextDecoration = { normal: normal, underline: underline, strikethrough: strikethrough };

exports.TextDecoration = TextDecoration;
exports.normal = normal;
exports.strikethrough = strikethrough;
exports.underline = underline;
