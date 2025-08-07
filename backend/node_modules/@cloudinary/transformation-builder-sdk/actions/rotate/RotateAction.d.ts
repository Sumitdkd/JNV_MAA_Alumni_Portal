import { Action } from "../../internal/Action.js";
import { RotationModeQualifierValue } from "../../qualifiers/rotate/RotationModeQualifierValue.js";
import { RotationModeType } from "../../types/types.js";
import { IRotateByAngleActionModel } from "../../internal/models/IRotateActionModel.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
/**
 * @description Rotates or flips an image or video.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#rotating_images|Rotating images}
 * {@link https://cloudinary.com/documentation/video_effects_and_enhancements#rotating_videos|Rotating videos}
 * @extends SDK.Action
 * @memberOf Actions.Rotate
 * @see Visit {@link Actions.Rotate|Rotate} for an example
 */
declare class RotateAction extends Action {
    protected _actionModel: IRotateByAngleActionModel;
    constructor(angle?: number);
    /**
     * @description Rotates an asset using a defined mode.
     * @param {Qualifiers.RotationMode | RotationModeType | string} rotationMode
     * For a list of supported rotation modes see {@link Qualifiers.RotationMode| types of rotation modes} for
     * possible values
     * @return {this}
     */
    mode(rotationMode: RotationModeQualifierValue | RotationModeType | string): this;
    /**
     * @description Rotates an asset by the specified degrees.
     * @param {number} degrees rotation in degrees e.g 90, 45, 33
     * @return {this}
     */
    angle(degrees: number): this;
    static fromJson(actionModel: IActionModel): RotateAction;
}
export default RotateAction;
