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
 * @description A class that defines how to recolor objects in an asset using Generative AI
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
var GenerativeRecolor = /** @class */ (function (_super) {
    tslib_es6.__extends(GenerativeRecolor, _super);
    function GenerativeRecolor(prompts, color) {
        var _this = _super.call(this) || this;
        _this._prompts = [];
        _this._detectMultiple = false;
        // Alias method to be backwards compatible
        _this.multiple = _this.detectMultiple.bind(_this);
        _this._prompts = Array.isArray(prompts) ? prompts : [prompts];
        _this._toColor = color;
        _this._actionModel.actionType = "generativeRecolor";
        _this._actionModel.prompts = _this._prompts;
        _this._actionModel.toColor = _this._toColor;
        return _this;
    }
    GenerativeRecolor.prototype.detectMultiple = function (value) {
        if (value === void 0) { value = true; }
        this._detectMultiple = value;
        if (this._detectMultiple) {
            this._actionModel.detectMultiple = this._detectMultiple;
        }
        return this;
    };
    GenerativeRecolor.prototype.prepareQualifiers = function () {
        var qualifierValue = new internal_qualifier_QualifierValue.QualifierValue().setDelimiter(";");
        if (this._prompts.length) {
            qualifierValue.addValue(this.preparePromptValue());
        }
        if (this._toColor) {
            var formattedColor = this._toColor.match(/^#/)
                ? this._toColor.substr(1)
                : this._toColor;
            qualifierValue.addValue("to-color_" + formattedColor);
        }
        if (this._detectMultiple) {
            qualifierValue.addValue("multiple_true");
        }
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier("e", "gen_recolor:" + qualifierValue.toString()));
    };
    GenerativeRecolor.prototype.preparePromptValue = function () {
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
    GenerativeRecolor.fromJson = function (actionModel) {
        var prompts = actionModel.prompts, detectMultiple = actionModel.detectMultiple, toColor = actionModel.toColor;
        var result = new this(prompts, toColor);
        if (detectMultiple) {
            result.detectMultiple(detectMultiple);
        }
        return result;
    };
    return GenerativeRecolor;
}(internal_Action.Action));

exports.GenerativeRecolor = GenerativeRecolor;
