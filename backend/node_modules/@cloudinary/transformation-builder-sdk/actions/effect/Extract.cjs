'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
 * @description Extracts an area or multiple areas of an image, described in natural language.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
var Extract = /** @class */ (function (_super) {
    tslib_es6.__extends(Extract, _super);
    function Extract(prompts) {
        var _this = _super.call(this) || this;
        _this._prompts = [];
        _this._detectMultiple = false;
        _this._invert = false;
        _this._preserveAlpha = false;
        _this._actionModel.actionType = "extract";
        _this._prompts = Array.isArray(prompts) ? prompts : [prompts];
        _this._actionModel.prompts = _this._prompts;
        return _this;
    }
    Extract.prototype.detectMultiple = function (value) {
        if (value === void 0) { value = false; }
        this._detectMultiple = value;
        if (this._detectMultiple) {
            this._actionModel.detectMultiple = this._detectMultiple;
        }
        return this;
    };
    Extract.prototype.mode = function (mode) {
        this._mode = mode;
        this._actionModel.mode = this._mode;
        return this;
    };
    Extract.prototype.invert = function (value) {
        if (value === void 0) { value = true; }
        this._invert = value;
        if (this._invert) {
            this._actionModel.invert = this._invert;
        }
        return this;
    };
    Extract.prototype.preserveAlpha = function (value) {
        if (value === void 0) { value = true; }
        this._preserveAlpha = value;
        if (this._preserveAlpha) {
            this._actionModel.preserveAlpha = this._preserveAlpha;
        }
        return this;
    };
    Extract.prototype.prepareQualifiers = function () {
        var qualifierValue = new internal_qualifier_QualifierValue.QualifierValue().setDelimiter(";");
        if (this._prompts.length) {
            qualifierValue.addValue(this.preparePromptValue());
        }
        if (this._detectMultiple) {
            qualifierValue.addValue("multiple_true");
        }
        if (this._mode) {
            qualifierValue.addValue("mode_" + this._mode);
        }
        if (this._invert) {
            qualifierValue.addValue("invert_true");
        }
        if (this._preserveAlpha) {
            qualifierValue.addValue("preserve-alpha_true");
        }
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier("e", "extract:" + qualifierValue.toString()));
    };
    Extract.prototype.preparePromptValue = function () {
        var prompts = this._prompts;
        var qualifierValue = new internal_qualifier_QualifierValue.QualifierValue().setDelimiter(";");
        if (prompts.length === 1) {
            qualifierValue.addValue("prompt_" + prompts[0]);
        }
        else {
            qualifierValue.addValue("prompt_(" + prompts.join(";") + ")");
        }
        return qualifierValue;
    };
    Extract.fromJson = function (actionModel) {
        var prompts = actionModel.prompts, detectMultiple = actionModel.detectMultiple, mode = actionModel.mode, invert = actionModel.invert, preserveAlpha = actionModel.preserveAlpha;
        var result = new this(prompts);
        if (detectMultiple) {
            result.detectMultiple(detectMultiple);
        }
        if (mode) {
            result.mode(mode);
        }
        if (invert) {
            result.invert(invert);
        }
        if (preserveAlpha) {
            result.preserveAlpha(preserveAlpha);
        }
        return result;
    };
    return Extract;
}(internal_Action.Action));

exports.Extract = Extract;
