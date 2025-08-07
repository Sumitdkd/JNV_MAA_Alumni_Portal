import { getUrlPrefix, getUrlVersion, handleAssetType, handleDeliveryType } from "../internal/url/cloudinaryURL.js";
import URLConfig from "../config/URLConfig.js";
import { getSDKAnalyticsSignature } from "../sdkAnalytics/getSDKAnalyticsSignature.js";
/**
 * This const contains all the valid combination of asset/delivery for URL shortening purposes
 * It's exported because it's used in a test, but it's not really shared enough to belong in a separate file
 */
export const SEO_TYPES = {
    "image/upload": "images",
    "image/private": "private_images",
    "image/authenticated": "authenticated_images",
    "raw/upload": "files",
    "video/upload": "videos"
};
/**
 * @description Cloudinary file without a transformation
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryFile {
    constructor(publicID, cloudConfig = {}, urlConfig) {
        this.setPublicID(publicID);
        this.setCloudConfig(cloudConfig);
        this.setURLConfig(urlConfig);
    }
    /**
     * @description Sets the URL Config for this asset
     * @param urlConfig
     * @return {this}
     */
    setURLConfig(urlConfig) {
        this.urlConfig = new URLConfig(urlConfig);
        return this;
    }
    /**
     * @description Sets the Cloud Config for this asset
     * @param urlConfig
     * @return {this}
     */
    setCloudConfig(cloudConfig) {
        this.cloudName = cloudConfig.cloudName;
        this.apiKey = cloudConfig.apiKey;
        this.apiSecret = cloudConfig.apiSecret;
        this.authToken = cloudConfig.authToken;
        return this;
    }
    /**
     * @description Sets the public ID of the asset.
     * @param {string} publicID The public ID of the asset.
     * @return {this}
     */
    setPublicID(publicID) {
        // PublicID must be a string!
        this.publicID = publicID ? publicID.toString() : '';
        return this;
    }
    /**
     * @description Sets the delivery type of the asset.
     * @param {DELIVERY_TYPE | string} newType The type of the asset.
     * @return {this}
     */
    setDeliveryType(newType) {
        this.deliveryType = newType;
        return this;
    }
    /**
     * @description Sets the URL SEO suffix of the asset.
     * @param {string} newSuffix The SEO suffix.
     * @return {this}
     */
    setSuffix(newSuffix) {
        this.suffix = newSuffix;
        return this;
    }
    /**
     * @description Sets the signature of the asset.
     * @param {string} signature The signature.
     * @return {this}
     */
    setSignature(signature) {
        this.signature = signature;
        return this;
    }
    /**
     * @description Sets the version of the asset.
     * @param {string} newVersion The version of the asset.
     * @return {this}
     */
    setVersion(newVersion) {
        if (newVersion) {
            this.version = newVersion;
        }
        return this;
    }
    /**
     * @description Sets the asset type.
     * @param {string} newType The type of the asset.
     * @return {this}
     */
    setAssetType(newType) {
        if (newType) {
            this.assetType = newType;
        }
        return this;
    }
    sign() {
        return this;
    }
    /**
     * @description Serializes to URL string
     * @param overwriteOptions
     */
    toURL(overwriteOptions = {}) {
        return this.createCloudinaryURL(null, overwriteOptions.trackedAnalytics);
    }
    /**
     * @description Validate various options before attempting to create a URL
     * The function will throw in case a violation
     * @throws Validation errors
     */
    validateAssetForURLCreation() {
        if (typeof this.cloudName === 'undefined') {
            throw 'You must supply a cloudName when initializing the asset';
        }
        const suffixContainsDot = this.suffix && this.suffix.indexOf('.') >= 0;
        const suffixContainsSlash = this.suffix && this.suffix.indexOf('/') >= 0;
        if (suffixContainsDot || suffixContainsSlash) {
            throw '`suffix`` should not include . or /';
        }
    }
    /**
     * @description return an SEO friendly name for a combination of asset/delivery, some examples:
     * * image/upload -> images
     * * video/upload -> videos
     * If no match is found, return `{asset}/{delivery}`
     */
    getResourceType() {
        const assetType = handleAssetType(this.assetType);
        const deliveryType = handleDeliveryType(this.deliveryType);
        const hasSuffix = !!this.suffix;
        const regularSEOType = `${assetType}/${deliveryType}`;
        const shortSEOType = SEO_TYPES[`${assetType}/${deliveryType}`];
        const useRootPath = this.urlConfig.useRootPath;
        const shorten = this.urlConfig.shorten;
        // Quick exit incase of useRootPath
        if (useRootPath) {
            if (regularSEOType === 'image/upload') {
                return ''; // For image/upload we're done, just return nothing
            }
            else {
                throw new Error(`useRootPath can only be used with assetType: 'image' and deliveryType: 'upload'. Provided: ${regularSEOType} instead`);
            }
        }
        if (shorten && regularSEOType === 'image/upload') {
            return 'iu';
        }
        if (hasSuffix) {
            if (shortSEOType) {
                return shortSEOType;
            }
            else {
                throw new Error(`URL Suffix only supported for ${Object.keys(SEO_TYPES).join(', ')}, Provided: ${regularSEOType} instead`);
            }
        }
        // If all else fails, return the regular image/upload combination (asset/delivery)
        return regularSEOType;
    }
    getSignature() {
        if (this.signature) {
            return `s--${this.signature}--`;
        }
        else {
            return '';
        }
    }
    /**
     *
     * @description Creates a fully qualified CloudinaryURL
     * @return {string} CloudinaryURL
     * @throws Validation Errors
     */
    createCloudinaryURL(transformation, trackedAnalytics) {
        // In accordance with the existing implementation, if no publicID exists we should return nothing.
        if (!this.publicID) {
            return '';
        }
        // Throws if some options are mis-configured
        // See the function for more information on when it throws
        this.validateAssetForURLCreation();
        const prefix = getUrlPrefix(this.cloudName, this.urlConfig);
        const transformationString = transformation ? transformation.toString() : '';
        const version = getUrlVersion(this.publicID, this.version, this.urlConfig.forceVersion);
        const publicID = this.publicID;
        if (typeof transformation === 'string') {
            const url = [prefix, this.getResourceType(), this.getSignature(), transformationString, version, publicID.replace(/,/g, '%2C'), this.suffix]
                .filter((a) => a)
                .join('/');
            return url;
        }
        else {
            // Avoid applying encodeURI on entire string in case where we have transformations with comma (i.e. f_auto,q_auto)
            // Since encodeURI does not encode commas we replace commas *only* on the publicID
            const safeURL = [
                encodeURI(prefix),
                this.getResourceType(),
                this.getSignature(),
                encodeURI(transformationString),
                version,
                encodeURI(publicID).replace(/,/g, '%2C'),
                this.suffix && encodeURI(this.suffix)
            ]
                .filter((a) => a)
                .join('/')
                .replace(/\?/g, '%3F')
                .replace(/=/g, '%3D');
            const shouldAddAnalytics = this.urlConfig.analytics !== false && !(publicID.includes('?'));
            let queryParamsString = '';
            if (typeof (this.urlConfig.queryParams) === 'object') {
                try {
                    const queryParams = new URLSearchParams(this.urlConfig.queryParams);
                    if (shouldAddAnalytics) {
                        queryParams.set("_a", getSDKAnalyticsSignature(trackedAnalytics));
                    }
                    queryParamsString = queryParams.toString();
                }
                catch (err) {
                    console.error('Error: URLSearchParams is not available so the queryParams object cannot be parsed, please try passing as an already parsed string');
                }
            }
            else {
                queryParamsString = this.urlConfig.queryParams || '';
                if (shouldAddAnalytics) {
                    queryParamsString += `${(queryParamsString.length > 0 ? '&' : '')}_a=${getSDKAnalyticsSignature(trackedAnalytics)}`;
                }
            }
            if (queryParamsString) {
                return `${safeURL}?${queryParamsString}`;
            }
            else {
                return safeURL;
            }
        }
    }
}
export { CloudinaryFile };
