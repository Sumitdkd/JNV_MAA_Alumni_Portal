'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../tslib.es6-66bcd4e3.cjs');
var assets_CloudinaryTransformable = require('./CloudinaryTransformable.cjs');
var internal_utils_cloneDeep = require('../internal/utils/cloneDeep.cjs');
var Transformation = require('../Transformation-186b91ce.cjs');
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
require('../BackgroundColor-ebfc5c25.cjs');
require('../prepareColor-c03e99eb.cjs');
require('../RawAction-d0d9c15d.cjs');

/**
 * @desc Cloudinary media asset, with all possible transformations
 * @summary SDK
 * @memberOf SDK
 */
var CloudinaryMedia = /** @class */ (function (_super) {
    tslib_es6.__extends(CloudinaryMedia, _super);
    function CloudinaryMedia(publicID, cloudConfig, urlConfig) {
        /* istanbul ignore next */
        return _super.call(this, publicID, cloudConfig, urlConfig, new Transformation.Transformation()) || this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Transcode} action
     * @return {this}
     */
    CloudinaryMedia.prototype.transcode = function (action) {
        this.transformation.transcode(action);
        return this;
    };
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.VideoEdit} action
     * @return {this}
     */
    CloudinaryMedia.prototype.videoEdit = function (action) {
        this.transformation.videoEdit(action);
        return this;
    };
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @return {this}
     */
    CloudinaryMedia.prototype.underlay = function (underlayAction) {
        this.transformation.underlay(underlayAction);
        return this;
    };
    CloudinaryMedia.prototype.clone = function () {
        return internal_utils_cloneDeep.cloneDeep(this);
    };
    return CloudinaryMedia;
}(assets_CloudinaryTransformable.CloudinaryTransformable));

exports.CloudinaryMedia = CloudinaryMedia;
