'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_Action = require('../../internal/Action.cjs');
var internal_qualifier_QualifierValue = require('../../internal/qualifier/QualifierValue.cjs');
var internal_qualifier_Qualifier = require('../../internal/qualifier/Qualifier.cjs');
var qualifiers_region_RectangleRegion = require('../../qualifiers/region/RectangleRegion.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');

/**
 * @description A class that defines how to remove objects from an asset using Generative AI
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
var GenerativeRemove = /** @class */ (function (_super) {
    tslib_es6.__extends(GenerativeRemove, _super);
    function GenerativeRemove() {
        var _this = _super.call(this) || this;
        _this._prompts = [];
        _this._regions = [];
        _this._detectMultiple = false;
        _this._removeShadow = false;
        _this._actionModel.actionType = "generativeRemove";
        return _this;
    }
    GenerativeRemove.prototype.prompt = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        this._prompts = value;
        if (this._prompts.length > 0) {
            this._actionModel.prompts = this._prompts;
        }
        return this;
    };
    GenerativeRemove.prototype.region = function () {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        this._regions = value;
        if (this._regions.length > 0) {
            this._actionModel.regions = this._regions.map(function (region) { return region.toJson(); });
        }
        return this;
    };
    GenerativeRemove.prototype.detectMultiple = function (value) {
        if (value === void 0) { value = true; }
        this._detectMultiple = value;
        if (this._detectMultiple) {
            this._actionModel.detectMultiple = this._detectMultiple;
        }
        return this;
    };
    GenerativeRemove.prototype.removeShadow = function (value) {
        if (value === void 0) { value = true; }
        this._removeShadow = value;
        if (this._removeShadow) {
            this._actionModel.removeShadow = this._removeShadow;
        }
        return this;
    };
    GenerativeRemove.prototype.prepareQualifiers = function () {
        var qualifierValue = new internal_qualifier_QualifierValue.QualifierValue().setDelimiter(";");
        switch (true) {
            case this._prompts.length > 0: {
                qualifierValue.addValue(this.preparePromptValue());
                break;
            }
            case this._regions.length > 0: {
                qualifierValue.addValue(this.prepareRegionValue());
                break;
            }
        }
        if (this._detectMultiple) {
            qualifierValue.addValue("multiple_true");
        }
        if (this._removeShadow) {
            qualifierValue.addValue("remove-shadow_true");
        }
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier("e", "gen_remove:" + qualifierValue.toString()));
    };
    GenerativeRemove.prototype.preparePromptValue = function () {
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
    GenerativeRemove.prototype.prepareRegionValue = function () {
        var regions = this._regions;
        var qualifierValue = new internal_qualifier_QualifierValue.QualifierValue();
        if (regions.length === 1) {
            var singleRegion = regions[0].toString();
            qualifierValue.addValue("region_" + singleRegion);
        }
        else {
            var regionList = regions.map(function (region) { return region.toString(); });
            qualifierValue.addValue("region_(" + regionList.join(";") + ")");
        }
        return qualifierValue;
    };
    GenerativeRemove.fromJson = function (actionModel) {
        var prompts = actionModel.prompts, regions = actionModel.regions, detectMultiple = actionModel.detectMultiple, removeShadow = actionModel.removeShadow;
        var result = new this();
        if (regions) {
            result.region.apply(result, regions.map(function (_a) {
                var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                return new qualifiers_region_RectangleRegion.RectangleRegion(x, y, width, height);
            }));
        }
        if (prompts) {
            result.prompt.apply(result, prompts);
        }
        if (detectMultiple) {
            result.detectMultiple(detectMultiple);
        }
        if (removeShadow) {
            result.removeShadow(removeShadow);
        }
        return result;
    };
    return GenerativeRemove;
}(internal_Action.Action));

exports.GenerativeRemove = GenerativeRemove;
