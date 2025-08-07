'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../tslib.es6-66bcd4e3.cjs');
var ImageTransformation = require('../ImageTransformation-a0911f0c.cjs');
var assets_CloudinaryTransformable = require('./CloudinaryTransformable.cjs');
require('../Transformation-186b91ce.cjs');
require('../Action-0ed405c1.cjs');
require('../FlagQualifier-7b069f22.cjs');
require('../QualifierValue-e770d619.cjs');
require('../Qualifier-6633a22f.cjs');
require('../QualifierModel-0923d819.cjs');
require('../unsupportedError-74070138.cjs');
require('../BackgroundColor-ebfc5c25.cjs');
require('../prepareColor-c03e99eb.cjs');
require('../RawAction-d0d9c15d.cjs');
require('../DeliveryFormatAction-54638930.cjs');
require('../flag-31bc1b8c.cjs');
require('../DeliveryAction-9cae8595.cjs');
require('../FormatQualifier-ffbb8eb3.cjs');
require('../internalConstants-6e675c29.cjs');
require('../progressive-1ce2ceea.cjs');
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

/**
 * @desc Cloudinary image asset, with image-related transformations
 * @summary SDK
 * @memberOf SDK
 */
var CloudinaryImage = /** @class */ (function (_super) {
    tslib_es6.__extends(CloudinaryImage, _super);
    function CloudinaryImage(publicID, cloudConfig, urlConfig) {
        /* istanbul ignore next */
        return _super.call(this, publicID, cloudConfig, urlConfig, new ImageTransformation.ImageTransformation()) || this;
    }
    return CloudinaryImage;
}(assets_CloudinaryTransformable.CloudinaryTransformable));

exports.CloudinaryImage = CloudinaryImage;
