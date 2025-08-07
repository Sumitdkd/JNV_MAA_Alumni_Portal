/**
 * @private
 * @description Reverses the version positions, x.y.z turns to z.y.x
 *              Example: 1.2.3 -> 03.02.01
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} in the form of zz.yy.xx (
 */
export declare function reverseVersion(semVer: string): string;
