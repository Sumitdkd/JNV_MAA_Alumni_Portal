'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../tslib.es6-7a681263.cjs');
var internal_utils_encodePromptComponents = require('../../../internal/utils/encodePromptComponents.cjs');
var qualifiers_background_shared_base_BackgroundQualifier = require('./base/BackgroundQualifier.cjs');
require('../../../internal/qualifier/Qualifier.cjs');
require('../../../internal/qualifier/QualifierValue.cjs');
require('../../../internal/models/QualifierModel.cjs');
require('../../../internal/models/qualifierToJson.cjs');
require('../../../internal/utils/unsupportedError.cjs');

/**
 * @description Automatically fills the padded area using generative AI to extend the image seamlessly.
 * Optionally include a prompt to guide the image generation.
 * @memberOf Qualifiers.Background
 */
var BackgroundGenerativeFillQualifier = /** @class */ (function (_super) {
    tslib_es6.__extends(BackgroundGenerativeFillQualifier, _super);
    function BackgroundGenerativeFillQualifier() {
        var _this = _super.call(this, "gen_fill") || this;
        _this._backgroundType = 'generativeFill';
        return _this;
    }
    BackgroundGenerativeFillQualifier.prototype.prompt = function (prompt) {
        try {
            this._prompt = decodeURIComponent(prompt);
        }
        catch (_a) {
            this._prompt = prompt;
        }
        return this;
    };
    BackgroundGenerativeFillQualifier.prototype.getPrompt = function () {
        return this._prompt;
    };
    BackgroundGenerativeFillQualifier.prototype.getBackgroundType = function () {
        return this._backgroundType;
    };
    /**
     * @description
     * Override the toString() function to explicitly stringify the qualifier.
     */
    BackgroundGenerativeFillQualifier.prototype.toString = function () {
        return "b_gen_fill" + (this._prompt ? ":prompt_" + internal_utils_encodePromptComponents.encodePromptComponent(this._prompt) : '');
    };
    return BackgroundGenerativeFillQualifier;
}(qualifiers_background_shared_base_BackgroundQualifier.BackgroundQualifier));

exports.BackgroundGenerativeFillQualifier = BackgroundGenerativeFillQualifier;
