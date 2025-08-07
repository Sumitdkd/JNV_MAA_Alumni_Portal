'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

/**
 * @description Uses generative AI to replace parts of your image with something else.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
var GenerativeReplace = /** @class */ (function (_super) {
    tslib_es6.__extends(GenerativeReplace, _super);
    function GenerativeReplace() {
        var _this = _super.call(this) || this;
        _this._preserveGeometry = false;
        _this._detectMultiple = false;
        _this._actionModel.actionType = "generativeReplace";
        return _this;
    }
    GenerativeReplace.prototype.from = function (value) {
        this._from = value;
        this._actionModel.from = value;
        return this;
    };
    GenerativeReplace.prototype.to = function (value) {
        this._to = value;
        this._actionModel.to = value;
        return this;
    };
    GenerativeReplace.prototype.preserveGeometry = function (value) {
        if (value === void 0) { value = true; }
        this._preserveGeometry = value;
        if (value) {
            this._actionModel.preserveGeometry = true;
        }
        return this;
    };
    GenerativeReplace.prototype.detectMultiple = function (value) {
        if (value === void 0) { value = true; }
        this._detectMultiple = value;
        if (this._detectMultiple) {
            this._actionModel.detectMultiple = this._detectMultiple;
        }
        return this;
    };
    GenerativeReplace.prototype.prepareQualifiers = function () {
        var str = "gen_replace:from_" + this._from + ";to_" + this._to;
        if (this._preserveGeometry) {
            str += ";preserve-geometry_true";
        }
        if (this._detectMultiple) {
            str += ";multiple_true";
        }
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier("e", str));
    };
    GenerativeReplace.fromJson = function (actionModel) {
        var from = actionModel.from, to = actionModel.to, preserveGeometry = actionModel.preserveGeometry, detectMultiple = actionModel.detectMultiple;
        var result = new this();
        result.from(from);
        result.to(to);
        if (preserveGeometry) {
            result.preserveGeometry();
        }
        if (detectMultiple) {
            result.detectMultiple();
        }
        return result;
    };
    return GenerativeReplace;
}(internal_Action.Action));

exports.GenerativeReplace = GenerativeReplace;
