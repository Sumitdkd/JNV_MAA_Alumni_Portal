'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-66bcd4e3.cjs');
var NamedRegion = require('../../NamedRegion-38e9cc4d.cjs');
var Qualifier = require('../../Qualifier-6633a22f.cjs');
require('../../Action-0ed405c1.cjs');
require('../../FlagQualifier-7b069f22.cjs');
require('../../QualifierValue-e770d619.cjs');
require('../../unsupportedError-74070138.cjs');
require('../../QualifierModel-0923d819.cjs');

/**
 * @memberOf Qualifiers.Region
 */
var CustomRegion = /** @class */ (function (_super) {
    tslib_es6.__extends(CustomRegion, _super);
    function CustomRegion() {
        return _super.call(this, 'custom') || this;
    }
    /**
     * @description The x position in pixels.
     * @param {number} x
     */
    CustomRegion.prototype.x = function (x) {
        this.addQualifier(new Qualifier.Qualifier('x', x));
        return this;
    };
    /**
     * @description The y position in pixels.
     * @param {number} y
     */
    CustomRegion.prototype.y = function (y) {
        this.addQualifier(new Qualifier.Qualifier('y', y));
        return this;
    };
    /**
     * @description The width of the region in pixels.
     * @param {number} width
     */
    CustomRegion.prototype.width = function (width) {
        this.addQualifier(new Qualifier.Qualifier('w', width));
        return this;
    };
    /**
     * @description The height of the region in pixels.
     * @param {number} height
     */
    CustomRegion.prototype.height = function (height) {
        this.addQualifier(new Qualifier.Qualifier('h', height));
        return this;
    };
    return CustomRegion;
}(NamedRegion.NamedRegion));

exports.CustomRegion = CustomRegion;
