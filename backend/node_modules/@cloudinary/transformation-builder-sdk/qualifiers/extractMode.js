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
function content() {
    return 'content';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Extract
 */
function mask() {
    return 'mask';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Extract
 */
const ExtractMode = {
    content,
    mask
};
export { ExtractMode, content, mask };
