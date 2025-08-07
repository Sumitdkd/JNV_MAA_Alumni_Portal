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
declare function none(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontHinting
 */
declare function slight(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontHinting
 */
declare function medium(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontHinting
 */
declare function full(): string;
declare const FontHinting: {
    full: typeof full;
    none: typeof none;
    medium: typeof medium;
    slight: typeof slight;
};
export { FontHinting, full, none, medium, slight };
