'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Uses generative AI to replace parts of your image with something else.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class GenerativeReplace extends Action.Action {
    constructor() {
        super();
        this._preserveGeometry = false;
        this._detectMultiple = false;
        this._actionModel.actionType = "generativeReplace";
    }
    from(value) {
        this._from = value;
        this._actionModel.from = value;
        return this;
    }
    to(value) {
        this._to = value;
        this._actionModel.to = value;
        return this;
    }
    preserveGeometry(value = true) {
        this._preserveGeometry = value;
        if (value) {
            this._actionModel.preserveGeometry = true;
        }
        return this;
    }
    detectMultiple(value = true) {
        this._detectMultiple = value;
        if (this._detectMultiple) {
            this._actionModel.detectMultiple = this._detectMultiple;
        }
        return this;
    }
    prepareQualifiers() {
        let str = `gen_replace:from_${this._from};to_${this._to}`;
        if (this._preserveGeometry) {
            str += `;preserve-geometry_true`;
        }
        if (this._detectMultiple) {
            str += `;multiple_true`;
        }
        this.addQualifier(new Qualifier.Qualifier("e", str));
    }
    static fromJson(actionModel) {
        const { from, to, preserveGeometry, detectMultiple } = actionModel;
        const result = new this();
        result.from(from);
        result.to(to);
        if (preserveGeometry) {
            result.preserveGeometry();
        }
        if (detectMultiple) {
            result.detectMultiple();
        }
        return result;
    }
}

exports.GenerativeReplace = GenerativeReplace;
