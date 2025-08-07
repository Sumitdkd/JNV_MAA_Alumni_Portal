'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description Contains functions to select the font antialias setting.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
 * @memberOf Qualifiers
 * @namespace FontAntialias
 * @see To be used with {@link Qualifiers.TextStyle|Text Style}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontAntialias
 */
function none() {
    return '';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontAntialias
 */
function gray() {
    return 'gray';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontAntialias
 */
function subpixel() {
    return 'subpixel';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontAntialias
 */
function fast() {
    return 'fast';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontAntialias
 */
function good() {
    return 'good';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontAntialias
 */
function best() {
    return 'best';
}
const FontAntialias = { gray, subpixel, best, fast, none, good };

exports.FontAntialias = FontAntialias;
exports.best = best;
exports.fast = fast;
exports.good = good;
exports.gray = gray;
exports.none = none;
exports.subpixel = subpixel;
