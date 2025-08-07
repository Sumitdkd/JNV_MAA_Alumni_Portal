import { Action } from "../internal/Action.js";
import { SystemColors } from "../qualifiers/color.js";
import RoundCornersAction from "./roundCorners/RoundCornersAction.js";
import { IBorderActionModel } from "../internal/models/IBorderActionModel.js";
import { IActionModel } from "../internal/models/IActionModel.js";
/**
 * @description Adds a solid border around an image or video.
 *
 *  <b>Learn more:</b>
 * {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#borders|Adding image borders}
 * @memberOf Actions
 * @namespace Border
 * @example
 * import {Cloudinary} from "@cloudinary/url-gen";
 * import {solid} from "@cloudinary/url-gen/actions/border";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.border(
 *  solid(15, 'green'),
 *  // Or alternatively
 *  solid().width(15).color('green')
 * );
 *
 */
/**
 * @memberOf Actions.Border
 * @see Actions.Border
 * @example
 * // Used through a builder function Border.solid(), and not by creating a new instance
 * import {Cloudinary} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.border(
 *  Border.solid(15, 'green'),
 *  // Or alternatively
 *  Border.solid().width(15).color('green')
 * );
 */
declare class BorderAction extends Action {
    private borderWidth;
    private borderColor;
    private borderType;
    private _roundCorners;
    protected _actionModel: IBorderActionModel;
    /**
     * @description Adds a border of the specified type around an image or video.
     * @param {'solid'} borderType The type of border (currently only 'solid' is supported). Use values in {@link Qualifiers.Border|Border Values}.
     * @param {string} color The color of the border.
     * @param {number} borderWidth The width in pixels.
     */
    constructor(borderType: string, color: SystemColors, borderWidth: number | string);
    /**
     * @description Sets the width of the border
     * @param {number | string} borderWidth The width in pixels.
     */
    width(borderWidth: number | string): this;
    /**
     * @description Sets the color of the border.
     * @param {string} borderColor The color of the border.
     */
    color(borderColor: SystemColors): this;
    /**
     * @description Rounds the specified corners of an image.
     * @param {RoundCornersAction} roundCorners
     * @return {this}
     */
    roundCorners(roundCorners: RoundCornersAction): this;
    /**
     * @description Sets the style of the border.
     * @param {number | string} width The width in pixels.
     * @param {string} color The color of the border, e.g 'green', 'yellow'.
     * @return {this}
     */
    solid(width: number | string, color: SystemColors): BorderAction;
    protected prepareQualifiers(): void;
    static fromJson(actionModel: IActionModel): BorderAction;
}
/**
 * @summary action
 * @memberOf Actions.Border
 * @description Sets the style of the border.
 * @param {number | string} width The width in pixels.
 * @param {string} color The color of the border, e.g 'green', 'yellow'.
 * @return {Actions.Border.BorderAction}
 */
declare function solid(width: number | string, color: SystemColors): BorderAction;
/**
 * @summary action
 * @memberOf Actions.Border
 * @description Sets the radius of the border.
 * @param {Actions.RoundCorners.RoundCornersAction} roundCorners RoundCorners action.
 * @return {Actions.Border.BorderAction}
 */
declare function roundCorners(roundCorners: RoundCornersAction): BorderAction;
declare const Border: {
    solid: typeof solid;
    roundCorners: typeof roundCorners;
};
export { BorderAction, Border, solid, roundCorners };
