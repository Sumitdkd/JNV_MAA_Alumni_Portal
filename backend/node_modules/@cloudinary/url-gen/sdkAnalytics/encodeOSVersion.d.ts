/**
 * @private
 * @description Encodes a semVer-like version string for OS
 * @param {string} semVer Input is x.y
 * @return {string} A string built from 2 characters of the base64 table that encode the semVer
 */
export declare function encodeOSVersion(semVer: string): string;
