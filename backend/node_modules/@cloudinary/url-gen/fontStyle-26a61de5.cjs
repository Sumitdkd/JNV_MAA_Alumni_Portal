'use strict';

/**
 * @description Contains functions to select the style of the text.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
 * @memberOf Qualifiers
 * @namespace FontStyle
 * @see To be used with {@link Qualifiers.TextStyle|Text Style}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontStyle
 */
function normal() {
    return 'normal';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontStyle
 */
function italic() {
    return 'italic';
}
const FontStyle = { normal, italic };

exports.FontStyle = FontStyle;
exports.italic = italic;
exports.normal = normal;
