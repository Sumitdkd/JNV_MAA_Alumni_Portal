/**
 * @description Contains functions to select the font weight.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
 * @memberOf Qualifiers
 * @namespace FontWeight
 * @see To be used with {@link Qualifiers.TextStyle|Text Style}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontWeight
 */
declare function thin(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontWeight
 */
declare function light(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontWeight
 */
declare function normal(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontWeight
 */
declare function bold(): string;
declare const FontWeight: {
    bold: typeof bold;
    light: typeof light;
    normal: typeof normal;
    thin: typeof thin;
};
export { FontWeight, bold, light, normal, thin };
