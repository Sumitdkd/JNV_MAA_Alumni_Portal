import { Action } from "../../internal/Action.js";
import { ForegroundObjectValue } from "../../qualifiers/foregroundObject.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
/**
 * @description A class that defines how to remove the background of an asset
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
declare class BackgroundRemoval extends Action {
    private _fineEdges;
    private _hints;
    constructor();
    fineEdges(value?: boolean): this;
    hints(...values: ForegroundObjectValue[] | [ForegroundObjectValue[]]): this;
    protected prepareQualifiers(): void;
    static fromJson(actionModel: IActionModel): BackgroundRemoval;
}
export { BackgroundRemoval };
