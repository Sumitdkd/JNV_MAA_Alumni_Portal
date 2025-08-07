import { Action } from "../../internal/Action.js";
import { Qualifier } from "../../internal/qualifier/Qualifier.js";
/**
 * @description OpacityAction class, used to define the opacity of an asset
 * @memberOf Actions.Adjust
 * @extends SDK.Action
 */
class OpacityAdjustAction extends Action {
    constructor(level) {
        super();
        this._actionModel = { actionType: 'opacity' };
        this.level = level;
        this._actionModel.level = level;
        this.addQualifier(new Qualifier('o', level));
    }
    static fromJson(actionModel) {
        const { level } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        return new this(level);
    }
}
export { OpacityAdjustAction };
