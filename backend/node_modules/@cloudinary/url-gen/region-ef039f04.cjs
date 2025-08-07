'use strict';

var NamedRegion = require('./NamedRegion-38e9cc4d.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var RectangleRegion = require('./RectangleRegion-2672a877.cjs');

/**
 * @memberOf Qualifiers.Region
 */
class CustomRegion extends NamedRegion.NamedRegion {
    constructor() {
        super('custom');
    }
    /**
     * @description The x position in pixels.
     * @param {number | string} x
     */
    x(x) {
        this._actionModel.x = x;
        this.addQualifier(new Qualifier.Qualifier('x', x));
        return this;
    }
    /**
     * @description The y position in pixels.
     * @param {number | string} y
     */
    y(y) {
        this._actionModel.y = y;
        this.addQualifier(new Qualifier.Qualifier('y', y));
        return this;
    }
    /**
     * @description The width of the region in pixels.
     * @param {number | string} width
     */
    width(width) {
        this._actionModel.width = width;
        this.addQualifier(new Qualifier.Qualifier('w', width));
        return this;
    }
    /**
     * @description The height of the region in pixels.
     * @param {number | string} height
     */
    height(height) {
        this._actionModel.height = height;
        this.addQualifier(new Qualifier.Qualifier('h', height));
        return this;
    }
    static fromJson(model) {
        const customRegion = new CustomRegion();
        if (model.width) {
            customRegion.width(model.width);
        }
        if (model.height) {
            customRegion.height(model.height);
        }
        if (model.x) {
            customRegion.x(model.x);
        }
        if (model.y) {
            customRegion.y(model.y);
        }
        return customRegion;
    }
}

/**
 * @summary qualifier
 * @memberOf Qualifiers.Region
 * @return {Qualifiers.Region.CustomRegion}
 */
function custom() {
    return new CustomRegion();
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Region
 * @return {Qualifiers.Region.NamedRegion}
 */
function faces() {
    return new NamedRegion.NamedRegion("faces");
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Region
 * @return {Qualifiers.Region.NamedRegion}
 */
function ocr() {
    return new NamedRegion.NamedRegion("ocr_text");
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Region
 * @return {Qualifiers.Region.RectangleRegion}
 */
function rectangle(x, y, width, height) {
    return new RectangleRegion.RectangleRegion(x, y, width, height);
}
/**
 * @description Contains functions to select the type of region, used with Effect.blur() and Effect.pixelate().
 * <b>See also</b>: {@link Actions.Effect.BlurAction|Blur Action}
 * <b>See also</b>: {@link Actions.Effect.Pixelate|Blur Action}
 * <b>See also</b>: {@link Actions.Effect|Possible effects}
 * @namespace Region
 * @memberOf Qualifiers
 */
const Region = { ocr, faces, custom, rectangle };

exports.CustomRegion = CustomRegion;
exports.Region = Region;
exports.custom = custom;
exports.faces = faces;
exports.ocr = ocr;
exports.rectangle = rectangle;
