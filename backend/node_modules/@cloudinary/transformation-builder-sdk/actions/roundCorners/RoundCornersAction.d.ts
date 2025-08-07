import { Action } from "../../internal/Action.js";
import { IRoundCornersActionModel, CornerRadiusValueType } from "../../internal/models/IRoundCornersActionModel.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
/**
 * @description A class to round one or more corners of an image or video.
 * @extends SDK.Action
 * @memberOf Actions.RoundCorners
 * @see Visit {@link Actions.RoundCorners|RoundCorners} for an example
 */
declare class RoundCornersAction extends Action {
    protected _actionModel: IRoundCornersActionModel;
    private _radius;
    constructor();
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @return {RoundCornersAction}
     */
    radius(a: number, b?: number, c?: number, d?: number): this;
    /**
     * @description Applies maximum rounding to the corners of the asset. An asset with square dimensions becomes a circle.
     */
    max(): this;
    getRadius(): CornerRadiusValueType;
    static fromJson(actionModel: IActionModel): RoundCornersAction;
}
export default RoundCornersAction;
