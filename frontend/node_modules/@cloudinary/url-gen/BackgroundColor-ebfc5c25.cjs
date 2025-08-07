'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var prepareColor = require('./prepareColor-c03e99eb.cjs');

/**
 * @extends SDK.Action
 * @description A class for background transformations.
 */
class BackgroundColor extends Action.Action {
    constructor(color) {
        super();
        this._actionModel = {};
        this.addQualifier(new Qualifier.Qualifier('b', new QualifierValue.QualifierValue(prepareColor.prepareColor(color)).setDelimiter('_')));
        this._actionModel.color = color;
        this._actionModel.actionType = 'backgroundColor';
    }
    static fromJson(actionModel) {
        const { color } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(color);
        return result;
    }
}

exports.BackgroundColor = BackgroundColor;
