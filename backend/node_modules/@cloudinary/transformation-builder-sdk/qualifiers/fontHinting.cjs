'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description Contains functions to select the font hinting setting.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
 * @memberOf Qualifiers
 * @namespace FontHinting
 * @see To be used with {@link Qualifiers.TextStyle|Text Style}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontHinting
 */
function none() {
    return '';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontHinting
 */
function slight() {
    return 'slight';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontHinting
 */
function medium() {
    return 'medium';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontHinting
 */
function full() {
    return 'full';
}
var FontHinting = { full: full, none: none, medium: medium, slight: slight };

exports.FontHinting = FontHinting;
exports.full = full;
exports.medium = medium;
exports.none = none;
exports.slight = slight;
