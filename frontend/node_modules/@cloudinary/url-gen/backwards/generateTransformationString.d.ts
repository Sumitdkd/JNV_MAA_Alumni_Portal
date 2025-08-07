import { LegacyITransforamtionOptions, LegacyTransformation as TransformationObject } from "../types/types.js";
/**
 * Things dropped
 * - responsive_width
 * - config().dpr
 * - SSL Detected
 * - Provisioning API
 * - Magical configuration auto-mapping (everything has to be explicit)
 * - Signatures
 * - Secure is default true
 * @param transformationOptions
 */
export declare function generateTransformationString(transformationOptions: LegacyITransforamtionOptions): string;
export declare const transformationStringFromObject: (transformationObject: TransformationObject) => string;
