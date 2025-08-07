'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @description A class to round one or more corners of an image or video.
 * @extends SDK.Action
 * @memberOf Actions.RoundCorners
 * @see Visit {@link Actions.RoundCorners|RoundCorners} for an example
 */
class RoundCornersAction extends Action.Action {
    constructor() {
        super();
        this._actionModel = {};
        this._actionModel.actionType = 'roundCorners';
    }
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @return {RoundCornersAction}
     */
    radius(a, b, c, d) {
        const qualifierValue = new QualifierValue.QualifierValue();
        // In case a === 0, check typeof
        a !== undefined && qualifierValue.addValue(a);
        b !== undefined && qualifierValue.addValue(b);
        c !== undefined && qualifierValue.addValue(c);
        d !== undefined && qualifierValue.addValue(d);
        const definedRadiuses = [a, b, c, d].filter((r) => r !== undefined);
        this._radius = definedRadiuses;
        this._actionModel.radius = definedRadiuses;
        this.addQualifier(new Qualifier.Qualifier('r').addValue(qualifierValue));
        return this;
    }
    /**
     * @description Applies maximum rounding to the corners of the asset. An asset with square dimensions becomes a circle.
     */
    max() {
        this._radius = 'max';
        this._actionModel.radius = 'max';
        return this.addQualifier(new Qualifier.Qualifier('r', 'max'));
    }
    getRadius() {
        return this._radius;
    }
    static fromJson(actionModel) {
        const { radius } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this();
        if (Array.isArray(radius)) {
            result.radius(radius[0], radius[1], radius[2], radius[3]);
        }
        if (radius === 'max') {
            result.max();
        }
        return result;
    }
}
var RoundCornersAction$1 = RoundCornersAction;

exports.RoundCornersAction = RoundCornersAction$1;
