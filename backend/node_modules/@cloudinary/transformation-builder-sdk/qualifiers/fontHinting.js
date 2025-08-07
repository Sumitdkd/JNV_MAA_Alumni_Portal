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
const FontHinting = { full, none, medium, slight };
export { FontHinting, full, none, medium, slight };
