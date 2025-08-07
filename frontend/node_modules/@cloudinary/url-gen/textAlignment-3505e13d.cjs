'use strict';

/**
 * @description Contains functions to select the alignment of the text.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
 * @memberOf Qualifiers
 * @namespace TextAlignment
 * @see To be used with {@link Qualifiers.TextStyle|Text Style}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextAlignment
 */
function left() {
    return 'left';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextAlignment
 */
function right() {
    return 'right';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextAlignment
 */
function center() {
    return 'center';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextAlignment
 */
function start() {
    return 'start';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextAlignment
 */
function end() {
    return 'end';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.TextAlignment
 */
function justify() {
    return 'justify';
}
const TextAlignment = { left, right, center, end, justify, start };

exports.TextAlignment = TextAlignment;
exports.center = center;
exports.end = end;
exports.justify = justify;
exports.left = left;
exports.right = right;
exports.start = start;
