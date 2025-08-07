import { Action } from "../../../internal/Action.js";
import { SystemColors } from "../../../qualifiers/color.js";
import { IActionModel } from "../../../internal/models/IActionModel.js";
import { IBackgroundColorModel } from "../../../internal/models/IEffectActionModel.js";
/**
 * @extends SDK.Action
 * @description A class for background transformations.
 */
declare class BackgroundColor extends Action {
    protected _actionModel: IBackgroundColorModel;
    constructor(color: SystemColors);
    static fromJson(actionModel: IActionModel): BackgroundColor;
}
export { BackgroundColor };
