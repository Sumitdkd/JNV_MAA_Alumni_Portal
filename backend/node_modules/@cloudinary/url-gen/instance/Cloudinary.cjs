'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assets_CloudinaryImage = require('../assets/CloudinaryImage.cjs');
var assets_CloudinaryVideo = require('../assets/CloudinaryVideo.cjs');
require('../tslib.es6-66bcd4e3.cjs');
require('../ImageTransformation-a0911f0c.cjs');
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
require('../assets/CloudinaryTransformable.cjs');
require('../assets/CloudinaryFile.cjs');
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
require('../VideoTransformation-1229b337.cjs');

var Cloudinary = /** @class */ (function () {
    function Cloudinary(cloudinaryConfig) {
        if (cloudinaryConfig) {
            this.cloudinaryConfig = cloudinaryConfig;
        }
    }
    Cloudinary.prototype.image = function (publicID) {
        return new assets_CloudinaryImage.CloudinaryImage(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
    };
    Cloudinary.prototype.video = function (publicID) {
        return new assets_CloudinaryVideo.CloudinaryVideo(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
    };
    Cloudinary.prototype.setConfig = function (cloudinaryConfig) {
        this.cloudinaryConfig = cloudinaryConfig;
        return this;
    };
    Cloudinary.prototype.getConfig = function () {
        return this.cloudinaryConfig;
    };
    Cloudinary.prototype.extendConfig = function () {
        // Future implementation
    };
    return Cloudinary;
}());

exports.Cloudinary = Cloudinary;
