import { Action } from "../../internal/Action.js";
/**
 * @description Distorts the image to an arc shape.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#e_distort|Distorting images}</br>
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Distortion effects}
 * @param {number} degrees The degrees to arc the image
 * @extends SDK.Action
 * @memberOf Actions.Reshape
 * @see Visit {@link Actions.Reshape| Reshape} for examples
 */
declare class DistortArcAction extends Action {
    constructor(degrees: number | string);
}
export { DistortArcAction };
