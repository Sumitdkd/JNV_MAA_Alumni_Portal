import { Action } from "../../internal/Action.js";
import { OpacityActionModel } from "../../internal/models/IOpacityActionModel.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
/**
 * @description OpacityAction class, used to define the opacity of an asset
 * @memberOf Actions.Adjust
 * @extends SDK.Action
 */
declare class OpacityAdjustAction extends Action {
    private level;
    protected _actionModel: OpacityActionModel;
    constructor(level: number);
    static fromJson(actionModel: IActionModel): OpacityAdjustAction;
}
export { OpacityAdjustAction };
