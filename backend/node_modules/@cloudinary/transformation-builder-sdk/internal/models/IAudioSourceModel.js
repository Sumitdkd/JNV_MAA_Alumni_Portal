/**
 * Validates that given obj is an IImageSourceModel
 * @param obj
 */
export function isIAudioSourceModel(obj) {
    return obj && obj.sourceType === 'audio';
}
