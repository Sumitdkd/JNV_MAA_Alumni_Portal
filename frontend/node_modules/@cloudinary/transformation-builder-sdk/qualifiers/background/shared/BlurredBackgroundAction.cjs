'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../tslib.es6-7a681263.cjs');
var qualifiers_background_shared_base_BackgroundQualifier = require('./base/BackgroundQualifier.cjs');
require('../../../internal/qualifier/Qualifier.cjs');
require('../../../internal/qualifier/QualifierValue.cjs');
require('../../../internal/models/QualifierModel.cjs');
require('../../../internal/models/qualifierToJson.cjs');
require('../../../internal/utils/unsupportedError.cjs');

var DEFAULT_INTENSITY = 100;
var DEFAULT_BRIGHTNESS = 0;
/**
 * @description A class for blurred background transformations.
 * @memberOf Qualifiers.Background
 * @extends {Qualifiers.Background.BackgroundQualifier}
 */
var BlurredBackgroundAction = /** @class */ (function (_super) {
    tslib_es6.__extends(BlurredBackgroundAction, _super);
    function BlurredBackgroundAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @description Sets the intensity of the blur.
     * @param {number} value - The intensity of the blur.
     */
    BlurredBackgroundAction.prototype.intensity = function (value) {
        this.intensityLevel = value;
        return this;
    };
    /**
     * @description Sets the brightness of the background.
     * @param {number} value - The brightness of the background.
     */
    BlurredBackgroundAction.prototype.brightness = function (value) {
        this.brightnessLevel = value;
        return this;
    };
    /**
     * @description
     * Stringify the qualifier
     * BackgroundQualifiers don't have a value, but instead override the toString() function
     */
    BlurredBackgroundAction.prototype.toString = function () {
        // b_blurred:{intensity}:{brightness}
        var intensity = this.intensityLevel !== undefined ? ":" + this.intensityLevel : '';
        var brightness = this.brightnessLevel !== undefined
            ? this.intensityLevel !== undefined
                ? ":" + this.brightnessLevel
                : ":" + DEFAULT_INTENSITY + ":" + this.brightnessLevel
            : '';
        return "b_blurred" + intensity + brightness;
    };
    return BlurredBackgroundAction;
}(qualifiers_background_shared_base_BackgroundQualifier.BackgroundQualifier));

exports.DEFAULT_BRIGHTNESS = DEFAULT_BRIGHTNESS;
exports.DEFAULT_INTENSITY = DEFAULT_INTENSITY;
exports["default"] = BlurredBackgroundAction;
