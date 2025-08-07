'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../tslib.es6-66bcd4e3.cjs');
var assets_CloudinaryTransformable = require('./CloudinaryTransformable.cjs');
var VideoTransformation = require('../VideoTransformation-1229b337.cjs');
require('./CloudinaryFile.cjs');
require('../internal/url/cloudinaryURL.cjs');
require('../internal/url/urlUtils/isUrl.cjs');
require('../internal/url/urlUtils/isFileName.cjs');
require('../internal/url/urlUtils/publicIDContainsVersion.cjs');
require('../config/URLConfig.cjs');
require('../config/BaseConfig.cjs');
require('../internal/internalConstants.cjs');
require('../sdkAnalytics/getSDKAnalyticsSignature.cjs');
require('../sdkAnalytics/encodeVersion.cjs');
require('../sdkAnalytics/base64Map.cjs');
require('../sdkAnalytics/stringPad.cjs');
require('../sdkAnalytics/reverseVersion.cjs');
require('../sdkAnalytics/padVersion.cjs');
require('../sdkAnalytics/getAnalyticsOptions.cjs');
require('../internal/utils/packageVersion.cjs');
require('../sdkAnalytics/encodeOSVersion.cjs');
require('../DeliveryFormatAction-54638930.cjs');
require('../flag-31bc1b8c.cjs');
require('../FlagQualifier-7b069f22.cjs');
require('../QualifierValue-e770d619.cjs');
require('../Qualifier-6633a22f.cjs');
require('../QualifierModel-0923d819.cjs');
require('../unsupportedError-74070138.cjs');
require('../DeliveryAction-9cae8595.cjs');
require('../Action-0ed405c1.cjs');
require('../FormatQualifier-ffbb8eb3.cjs');
require('../internalConstants-6e675c29.cjs');
require('../progressive-1ce2ceea.cjs');
require('../Transformation-186b91ce.cjs');
require('../BackgroundColor-ebfc5c25.cjs');
require('../prepareColor-c03e99eb.cjs');
require('../RawAction-d0d9c15d.cjs');

/**
 * @desc Cloudinary video asset, with video-related transformations
 * @summary SDK
 * @memberOf SDK
 */
var CloudinaryVideo = /** @class */ (function (_super) {
    tslib_es6.__extends(CloudinaryVideo, _super);
    function CloudinaryVideo(publicID, cloudConfig, urlConfig) {
        var _this = 
        /* istanbul ignore next */
        _super.call(this, publicID, cloudConfig, urlConfig, new VideoTransformation.VideoTransformation()) || this;
        _this.assetType = 'video';
        return _this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Transcode} action
     * @return {this}
     */
    CloudinaryVideo.prototype.transcode = function (action) {
        this.transformation.transcode(action);
        return this;
    };
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.VideoEdit} action
     * @return {this}
     */
    CloudinaryVideo.prototype.videoEdit = function (action) {
        this.transformation.videoEdit(action);
        return this;
    };
    return CloudinaryVideo;
}(assets_CloudinaryTransformable.CloudinaryTransformable));

exports.CloudinaryVideo = CloudinaryVideo;
