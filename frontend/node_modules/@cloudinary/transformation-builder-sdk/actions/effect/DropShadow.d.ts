import { Action } from "../../internal/Action.js";
import { IDropShadowModel } from "../../internal/models/IEffectActionModel.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
/**
 * @description Adds a shadow to the object in an image.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
declare class DropShadow extends Action {
    private _azimuth;
    private _elevation;
    private _spread;
    protected _actionModel: IDropShadowModel;
    constructor();
    /**
     * @description
     * The direction the light is coming from to cause the shadow effect. (Range: 0 to 360, Server default: 215)
     * @param {number} azimuth
     * @return {this}
     */
    azimuth(azimuth?: number): this;
    /**
     * @description
     * The height of the light source above the 'ground' to cause the shadow effect. (Range: 0 to 90, Server default: 45)
     * @param {number} elevation
     * @return {this}
     */
    elevation(elevation?: number): this;
    /**
     * @description
     * The spread of the light source. A small number means 'point' light. A larger number means 'area' light. (Range: 0 to 100, Server default: 50)
     * @param {number} spread
     * @return {this}
     */
    spread(spread?: number): this;
    protected prepareQualifiers(): void;
    static fromJson(actionModel: IActionModel): DropShadow;
}
export { DropShadow };
