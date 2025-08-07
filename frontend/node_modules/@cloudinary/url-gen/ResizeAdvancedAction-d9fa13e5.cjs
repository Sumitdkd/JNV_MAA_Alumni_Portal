'use strict';

var ResizeSimpleAction = require('./ResizeSimpleAction-0ef78caa.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var createGravityModel = require('./createGravityModel-e2badc0f.cjs');
var createGravityFromModel = require('./createGravityFromModel-0f5b0a48.cjs');

/**
 * @description Defines an advanced resize.
 * @extends Actions.Resize.ResizeSimpleAction
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
class ResizeAdvancedAction extends ResizeSimpleAction.ResizeSimpleAction {
    /**
     * @description Which part of the original image to include.
     * @param {Qualifiers.Gravity} gravity
     */
    gravity(gravity) {
        this._actionModel.gravity = createGravityModel.createGravityModel(gravity);
        const gravityQualifier = typeof gravity === "string" ? new Qualifier.Qualifier('g', gravity) : gravity;
        return this.addQualifier(gravityQualifier);
    }
    static fromJson(actionModel) {
        const result = super.fromJson.apply(this, [actionModel]);
        if (actionModel.gravity) {
            result.gravity(createGravityFromModel.createGravityFromModel(actionModel.gravity));
        }
        return result;
    }
}

exports.ResizeAdvancedAction = ResizeAdvancedAction;
