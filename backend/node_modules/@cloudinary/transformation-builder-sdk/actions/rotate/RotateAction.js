import { Action } from "../../internal/Action.js";
import { Qualifier } from "../../internal/qualifier/Qualifier.js";
const QUALIFIER_KEY = 'a';
/**
 * @description Rotates or flips an image or video.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#rotating_images|Rotating images}
 * {@link https://cloudinary.com/documentation/video_effects_and_enhancements#rotating_videos|Rotating videos}
 * @extends SDK.Action
 * @memberOf Actions.Rotate
 * @see Visit {@link Actions.Rotate|Rotate} for an example
 */
class RotateAction extends Action {
    constructor(angle) {
        super();
        this._actionModel = {};
        this.addQualifier(new Qualifier(QUALIFIER_KEY, angle));
        if (angle) {
            this._actionModel.actionType = 'rotateByAngle';
            this._actionModel.angle = angle;
        }
    }
    /**
     * @description Rotates an asset using a defined mode.
     * @param {Qualifiers.RotationMode | RotationModeType | string} rotationMode
     * For a list of supported rotation modes see {@link Qualifiers.RotationMode| types of rotation modes} for
     * possible values
     * @return {this}
     */
    mode(rotationMode) {
        this._actionModel.actionType = 'rotateByMode';
        this._actionModel.mode = rotationMode;
        return this.addValueToQualifier(QUALIFIER_KEY, rotationMode);
    }
    /**
     * @description Rotates an asset by the specified degrees.
     * @param {number} degrees rotation in degrees e.g 90, 45, 33
     * @return {this}
     */
    angle(degrees) {
        this._actionModel.actionType = 'rotateByAngle';
        this._actionModel.angle = degrees;
        return this.addValueToQualifier(QUALIFIER_KEY, degrees);
    }
    static fromJson(actionModel) {
        const { angle, mode } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = mode ? new this().mode(mode) : new this(angle);
        return result;
    }
}
export default RotateAction;
