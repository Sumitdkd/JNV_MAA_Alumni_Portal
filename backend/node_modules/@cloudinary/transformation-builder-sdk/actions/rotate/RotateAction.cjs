'use strict';

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_Action = require('../../internal/Action.cjs');
var internal_qualifier_Qualifier = require('../../internal/qualifier/Qualifier.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/qualifier/QualifierValue.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');

var QUALIFIER_KEY = 'a';
/**
 * @description Rotates or flips an image or video.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#rotating_images|Rotating images}
 * {@link https://cloudinary.com/documentation/video_effects_and_enhancements#rotating_videos|Rotating videos}
 * @extends SDK.Action
 * @memberOf Actions.Rotate
 * @see Visit {@link Actions.Rotate|Rotate} for an example
 */
var RotateAction = /** @class */ (function (_super) {
    tslib_es6.__extends(RotateAction, _super);
    function RotateAction(angle) {
        var _this = _super.call(this) || this;
        _this._actionModel = {};
        _this.addQualifier(new internal_qualifier_Qualifier.Qualifier(QUALIFIER_KEY, angle));
        if (angle) {
            _this._actionModel.actionType = 'rotateByAngle';
            _this._actionModel.angle = angle;
        }
        return _this;
    }
    /**
     * @description Rotates an asset using a defined mode.
     * @param {Qualifiers.RotationMode | RotationModeType | string} rotationMode
     * For a list of supported rotation modes see {@link Qualifiers.RotationMode| types of rotation modes} for
     * possible values
     * @return {this}
     */
    RotateAction.prototype.mode = function (rotationMode) {
        this._actionModel.actionType = 'rotateByMode';
        this._actionModel.mode = rotationMode;
        return this.addValueToQualifier(QUALIFIER_KEY, rotationMode);
    };
    /**
     * @description Rotates an asset by the specified degrees.
     * @param {number} degrees rotation in degrees e.g 90, 45, 33
     * @return {this}
     */
    RotateAction.prototype.angle = function (degrees) {
        this._actionModel.actionType = 'rotateByAngle';
        this._actionModel.angle = degrees;
        return this.addValueToQualifier(QUALIFIER_KEY, degrees);
    };
    RotateAction.fromJson = function (actionModel) {
        var _a = actionModel, angle = _a.angle, mode = _a.mode;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        var result = mode ? new this().mode(mode) : new this(angle);
        return result;
    };
    return RotateAction;
}(internal_Action.Action));

module.exports = RotateAction;
