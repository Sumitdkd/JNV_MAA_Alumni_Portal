'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../tslib.es6-7a681263.cjs');
var qualifiers_source_BaseSource = require('../BaseSource.cjs');
require('../../../internal/models/QualifierModel.cjs');
require('../../../internal/models/qualifierToJson.cjs');
require('../../../internal/utils/unsupportedError.cjs');

/**
 * @memberOf Qualifiers.Source
 * @extends {Qualifiers.Source.AudioSource}
 * @description Defines how to manipulate a Subtitles layer
 */
var AudioSource = /** @class */ (function (_super) {
    tslib_es6.__extends(AudioSource, _super);
    function AudioSource(publicId) {
        var _this = _super.call(this) || this;
        _this._qualifierModel = {
            sourceType: 'audio',
            publicId: publicId
        };
        return _this;
    }
    /**
     * @description
     * Returns the opening string of the layer,
     * This method is used internally within {@link SDK.LayerAction|LayerAction}
     * @returns {string}
     */
    AudioSource.prototype.getOpenSourceString = function (layerType) {
        var encodedPublicID = this.encodeAssetPublicID(this._qualifierModel.publicId);
        return layerType + "_audio:" + encodedPublicID;
    };
    AudioSource.fromJson = function (qualifierModel, transformationFromJson) {
        var publicId = qualifierModel.publicId, transformation = qualifierModel.transformation;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [qualifierModel])
        // This allows the inheriting classes to determine the class to be created
        // @ts-ignore
        var result = new this(publicId);
        if (transformation) {
            result.transformation(transformationFromJson(transformation));
        }
        return result;
    };
    return AudioSource;
}(qualifiers_source_BaseSource.BaseSource));

exports.AudioSource = AudioSource;
