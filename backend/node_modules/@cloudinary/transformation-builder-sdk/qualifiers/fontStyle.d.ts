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
declare function normal(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontStyle
 */
declare function italic(): string;
declare const FontStyle: {
    normal: typeof normal;
    italic: typeof italic;
};
export { FontStyle, italic, normal };
