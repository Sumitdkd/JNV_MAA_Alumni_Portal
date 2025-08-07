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
 * @description A class that defines how to remove the background of an asset
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
var BackgroundRemoval = /** @class */ (function (_super) {
    tslib_es6.__extends(BackgroundRemoval, _super);
    function BackgroundRemoval() {
        var _this = _super.call(this) || this;
        _this._actionModel.actionType = "backgroundRemoval";
        return _this;
    }
    BackgroundRemoval.prototype.fineEdges = function (value) {
        if (value === void 0) { value = true; }
        this._fineEdges = value;
        this._actionModel.fineEdges = this._fineEdges;
        return this;
    };
    BackgroundRemoval.prototype.hints = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 1 && Array.isArray(values[0])) {
            // Handle the case of a single array argument
            this._hints = values[0];
        }
        else if (values.length) {
            this._hints = values;
        }
        if (this._hints) {
            this._actionModel.hints = this._hints;
        }
        return this;
    };
    BackgroundRemoval.prototype.prepareQualifiers = function () {
        var _a;
        var str = "background_removal";
        var params = [];
        if (this._fineEdges !== undefined) {
            params.push(new internal_qualifier_QualifierValue.QualifierValue("fineedges_" + (this._fineEdges ? "y" : "n")).toString());
        }
        if ((_a = this._hints) === null || _a === void 0 ? void 0 : _a.length) {
            params.push(new internal_qualifier_QualifierValue.QualifierValue("hints_(" + this._hints.join(";") + ")").toString());
        }
        if (params.length > 0) {
            str += ":" + params.join(";");
        }
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier("e", str));
    };
    BackgroundRemoval.fromJson = function (actionModel) {
        var _a = actionModel, fineEdges = _a.fineEdges, hints = _a.hints;
        var result = new this();
        if (fineEdges !== undefined) {
            result.fineEdges(fineEdges);
        }
        if (hints === null || hints === void 0 ? void 0 : hints.length) {
            result.hints(hints);
        }
        return result;
    };
    return BackgroundRemoval;
}(internal_Action.Action));

exports.BackgroundRemoval = BackgroundRemoval;
