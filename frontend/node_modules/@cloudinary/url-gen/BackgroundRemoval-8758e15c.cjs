'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description A class that defines how to remove the background of an asset
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class BackgroundRemoval extends Action.Action {
    constructor() {
        super();
        this._actionModel.actionType = "backgroundRemoval";
    }
    fineEdges(value = true) {
        this._fineEdges = value;
        this._actionModel.fineEdges = this._fineEdges;
        return this;
    }
    hints(...values) {
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
    }
    prepareQualifiers() {
        var _a;
        let str = "background_removal";
        const params = [];
        if (this._fineEdges !== undefined) {
            params.push(new QualifierValue.QualifierValue(`fineedges_${this._fineEdges ? "y" : "n"}`).toString());
        }
        if ((_a = this._hints) === null || _a === void 0 ? void 0 : _a.length) {
            params.push(new QualifierValue.QualifierValue(`hints_(${this._hints.join(";")})`).toString());
        }
        if (params.length > 0) {
            str += `:${params.join(";")}`;
        }
        this.addQualifier(new Qualifier.Qualifier("e", str));
    }
    static fromJson(actionModel) {
        const { fineEdges, hints } = actionModel;
        const result = new this();
        if (fineEdges !== undefined) {
            result.fineEdges(fineEdges);
        }
        if (hints === null || hints === void 0 ? void 0 : hints.length) {
            result.hints(hints);
        }
        return result;
    }
}

exports.BackgroundRemoval = BackgroundRemoval;
