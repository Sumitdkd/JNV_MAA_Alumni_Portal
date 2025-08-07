/**
 * @private
 * @description Pads each segment with '0' so they have length of 2
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} in the form of xx.yy.zz (
 */
export declare function padVersion(semVer: string): string;
