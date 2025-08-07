'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_Action = require('../../internal/Action.cjs');
var internal_qualifier_QualifierValue = require('../../internal/qualifier/QualifierValue.cjs');
var internal_qualifier_Qualifier = require('../../internal/qualifier/Qualifier.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');

/**
 * @description Adds a shadow to the object in an image.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
var DropShadow = /** @class */ (function (_super) {
    tslib_es6.__extends(DropShadow, _super);
    function DropShadow() {
        var _this = _super.call(this) || this;
        _this._actionModel = {};
        _this._actionModel.actionType = 'dropshadow';
        return _this;
    }
    /**
     * @description
     * The direction the light is coming from to cause the shadow effect. (Range: 0 to 360, Server default: 215)
     * @param {number} azimuth
     * @return {this}
     */
    DropShadow.prototype.azimuth = function (azimuth) {
        this._actionModel.azimuth = azimuth;
        this._azimuth = azimuth;
        return this;
    };
    /**
     * @description
     * The height of the light source above the 'ground' to cause the shadow effect. (Range: 0 to 90, Server default: 45)
     * @param {number} elevation
     * @return {this}
     */
    DropShadow.prototype.elevation = function (elevation) {
        this._actionModel.elevation = elevation;
        this._elevation = elevation;
        return this;
    };
    /**
     * @description
     * The spread of the light source. A small number means 'point' light. A larger number means 'area' light. (Range: 0 to 100, Server default: 50)
     * @param {number} spread
     * @return {this}
     */
    DropShadow.prototype.spread = function (spread) {
        this._actionModel.spread = spread;
        this._spread = spread;
        return this;
    };
    DropShadow.prototype.prepareQualifiers = function () {
        var paramNames = ['azimuth', 'elevation', 'spread'];
        var paramValues = [this._azimuth, this._elevation, this._spread];
        var paramString = paramValues.map(function (value, index) { return value !== undefined ? paramNames[index] + "_" + value : ''; }).filter(Boolean).join(';');
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier('e', new internal_qualifier_QualifierValue.QualifierValue(['dropshadow', paramString]).setDelimiter(':')));
    };
    DropShadow.fromJson = function (actionModel) {
        var _a = actionModel, azimuth = _a.azimuth, elevation = _a.elevation, spread = _a.spread;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        var result = new this();
        azimuth && result.azimuth(azimuth);
        elevation && result.elevation(elevation);
        spread && result.spread(spread);
        return result;
    };
    return DropShadow;
}(internal_Action.Action));

exports.DropShadow = DropShadow;
