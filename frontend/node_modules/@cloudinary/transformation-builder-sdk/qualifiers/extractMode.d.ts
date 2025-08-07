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
declare function content(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.Extract
 */
declare function mask(): string;
/**
 * @summary qualifier
 * @memberOf Qualifiers.Extract
 */
declare const ExtractMode: {
    content: typeof content;
    mask: typeof mask;
};
export { ExtractMode, content, mask };
