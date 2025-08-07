import { BackgroundQualifier } from "../../qualifiers/background/shared/base/BackgroundQualifier.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
import { ResizeSimpleAction } from "./ResizeSimpleAction.js";
import { IGravity } from "../../qualifiers/gravity/GravityQualifier.js";
/**
 * @description Tries to prevent a "bad crop" by first attempting to use the auto cropping mode, but adding some padding if the algorithm determines that more of the original image needs to be included in the final image.
 * @extends Actions.Resize.autoPad
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
declare class ResizeAutoPadAction extends ResizeSimpleAction {
    constructor(cropType: string, cropWidth: number | string, cropHeight?: number | string);
    /**
     * @description Sets the background.
     * @param {Qualifiers.Background} backgroundQualifier Defines the background color to use instead of
     * transparent background areas or when resizing with padding.
     */
    background(backgroundQualifier: BackgroundQualifier | string): this;
    gravity(gravity: IGravity): this;
    static fromJson(actionModel: IActionModel): ResizeAutoPadAction;
}
export { ResizeAutoPadAction };
