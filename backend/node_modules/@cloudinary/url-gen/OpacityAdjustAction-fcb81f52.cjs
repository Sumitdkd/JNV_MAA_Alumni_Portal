'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description OpacityAction class, used to define the opacity of an asset
 * @memberOf Actions.Adjust
 * @extends SDK.Action
 */
class OpacityAdjustAction extends Action.Action {
    constructor(level) {
        super();
        this._actionModel = { actionType: 'opacity' };
        this.level = level;
        this._actionModel.level = level;
        this.addQualifier(new Qualifier.Qualifier('o', level));
    }
    static fromJson(actionModel) {
        const { level } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        return new this(level);
    }
}

exports.OpacityAdjustAction = OpacityAdjustAction;
