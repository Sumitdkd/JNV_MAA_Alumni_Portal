'use strict';

var ImageSource = require('./ImageSource-2890c2e5.cjs');
var FetchSource = require('./FetchSource-b49b90bf.cjs');
var VideoSource = require('./VideoSource-c3c76a47.cjs');
var TextSource = require('./TextSource-e553076e.cjs');
var AudioSource = require('./AudioSource-10f49548.cjs');

/**
 * Validates that given obj is an IImageSourceModel
 * @param obj
 */
function isIImageSourceModel(obj) {
    return obj && obj.sourceType === 'image';
}

/**
 * Validates that given obj is an IFetchSourceModel
 * @param obj
 */
function isIFetchSourceModel(obj) {
    return obj && obj.sourceType === 'fetch';
}

/**
 * Validates that given obj is an IImageSourceModel
 * @param obj
 */
function isITextSourceModel(obj) {
    return obj && obj.sourceType === 'text';
}

/**
 * Validates that given obj is an IImageSourceModel
 * @param obj
 */
function isIAudioSourceModel(obj) {
    return obj && obj.sourceType === 'audio';
}

/**
 * Create Source from given model json
 * @param source
 * @param transformationFromJson
 */
function createSourceFromModel(source, transformationFromJson) {
    if (isITextSourceModel(source)) {
        return TextSource.TextSource.fromJson(source, transformationFromJson);
    }
    else if (isIImageSourceModel(source)) {
        return ImageSource.ImageSource.fromJson(source, transformationFromJson);
    }
    else if (isIFetchSourceModel(source)) {
        return FetchSource.FetchSource.fromJson(source, transformationFromJson);
    }
    else if (isIAudioSourceModel(source)) {
        return AudioSource.AudioSource.fromJson(source, transformationFromJson);
    }
    else {
        return VideoSource.VideoSource.fromJson(source, transformationFromJson);
    }
}

exports.createSourceFromModel = createSourceFromModel;
