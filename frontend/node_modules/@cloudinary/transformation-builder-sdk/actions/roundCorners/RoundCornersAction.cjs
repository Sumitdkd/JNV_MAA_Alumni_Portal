'use strict';

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_Action = require('../../internal/Action.cjs');
var internal_qualifier_Qualifier = require('../../internal/qualifier/Qualifier.cjs');
var internal_qualifier_QualifierValue = require('../../internal/qualifier/QualifierValue.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');

/**
 * @description A class to round one or more corners of an image or video.
 * @extends SDK.Action
 * @memberOf Actions.RoundCorners
 * @see Visit {@link Actions.RoundCorners|RoundCorners} for an example
 */
var RoundCornersAction = /** @class */ (function (_super) {
    tslib_es6.__extends(RoundCornersAction, _super);
    function RoundCornersAction() {
        var _this = _super.call(this) || this;
        _this._actionModel = {};
        _this._actionModel.actionType = 'roundCorners';
        return _this;
    }
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @return {RoundCornersAction}
     */
    RoundCornersAction.prototype.radius = function (a, b, c, d) {
        var qualifierValue = new internal_qualifier_QualifierValue.QualifierValue();
        // In case a === 0, check typeof
        a !== undefined && qualifierValue.addValue(a);
        b !== undefined && qualifierValue.addValue(b);
        c !== undefined && qualifierValue.addValue(c);
        d !== undefined && qualifierValue.addValue(d);
        var definedRadiuses = [a, b, c, d].filter(function (r) { return r !== undefined; });
        this._radius = definedRadiuses;
        this._actionModel.radius = definedRadiuses;
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier('r').addValue(qualifierValue));
        return this;
    };
    /**
     * @description Applies maximum rounding to the corners of the asset. An asset with square dimensions becomes a circle.
     */
    RoundCornersAction.prototype.max = function () {
        this._radius = 'max';
        this._actionModel.radius = 'max';
        return this.addQualifier(new internal_qualifier_Qualifier.Qualifier('r', 'max'));
    };
    RoundCornersAction.prototype.getRadius = function () {
        return this._radius;
    };
    RoundCornersAction.fromJson = function (actionModel) {
        var radius = actionModel.radius;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        var result = new this();
        if (Array.isArray(radius)) {
            result.radius(radius[0], radius[1], radius[2], radius[3]);
        }
        if (radius === 'max') {
            result.max();
        }
        return result;
    };
    return RoundCornersAction;
}(internal_Action.Action));

module.exports = RoundCornersAction;
