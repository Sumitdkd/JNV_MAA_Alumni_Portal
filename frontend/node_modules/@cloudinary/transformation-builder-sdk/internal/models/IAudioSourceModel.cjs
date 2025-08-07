'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Validates that given obj is an IImageSourceModel
 * @param obj
 */
function isIAudioSourceModel(obj) {
    return obj && obj.sourceType === 'audio';
}

exports.isIAudioSourceModel = isIAudioSourceModel;
