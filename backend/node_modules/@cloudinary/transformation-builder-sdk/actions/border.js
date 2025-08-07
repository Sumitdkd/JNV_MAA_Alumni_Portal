import { Action } from "../internal/Action.js";
import { QualifierValue } from "../internal/qualifier/QualifierValue.js";
import { Qualifier } from "../internal/qualifier/Qualifier.js";
import { prepareColor } from "../internal/utils/prepareColor.js";
import RoundCornersAction from "./roundCorners/RoundCornersAction.js";
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
class BorderAction extends Action {
    /**
     * @description Adds a border of the specified type around an image or video.
     * @param {'solid'} borderType The type of border (currently only 'solid' is supported). Use values in {@link Qualifiers.Border|Border Values}.
     * @param {string} color The color of the border.
     * @param {number} borderWidth The width in pixels.
     */
    constructor(borderType, color, borderWidth) {
        super();
        this._actionModel = {};
        this.borderType = borderType;
        this.borderColor = prepareColor(color);
        this.borderWidth = borderWidth;
        this._actionModel = {
            color: prepareColor(color),
            width: borderWidth,
            actionType: 'border',
        };
    }
    /**
     * @description Sets the width of the border
     * @param {number | string} borderWidth The width in pixels.
     */
    width(borderWidth) {
        this.borderWidth = borderWidth;
        this._actionModel.width = borderWidth;
        return this;
    }
    /**
     * @description Sets the color of the border.
     * @param {string} borderColor The color of the border.
     */
    color(borderColor) {
        this.borderColor = prepareColor(borderColor);
        this._actionModel.color = prepareColor(borderColor);
        return this;
    }
    /**
     * @description Rounds the specified corners of an image.
     * @param {RoundCornersAction} roundCorners
     * @return {this}
     */
    roundCorners(roundCorners) {
        this._roundCorners = roundCorners;
        this._actionModel.radius = roundCorners.getRadius();
        return this;
    }
    /**
     * @description Sets the style of the border.
     * @param {number | string} width The width in pixels.
     * @param {string} color The color of the border, e.g 'green', 'yellow'.
     * @return {this}
     */
    solid(width, color) {
        this.borderType = 'solid';
        this.borderColor = prepareColor(color);
        this.borderWidth = width;
        this._actionModel.color = prepareColor(color);
        this._actionModel.width = width;
        return this;
    }
    prepareQualifiers() {
        const qualifierValue = new QualifierValue([`${this.borderWidth}px`, this.borderType, `${this.borderColor}`]).setDelimiter('_');
        this.addQualifier(new Qualifier('bo', qualifierValue));
        if (this._roundCorners) {
            this.addQualifier(this._roundCorners.qualifiers.get('r'));
        }
    }
    static fromJson(actionModel) {
        const { width, color, radius } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this('solid', color, width);
        if (radius) {
            const roundCornersAction = (() => {
                if (radius === 'max') {
                    return new RoundCornersAction().max();
                }
                if (Array.isArray(radius)) {
                    return new RoundCornersAction().radius(...radius);
                }
                return undefined;
            })();
            if (roundCornersAction) {
                result.roundCorners(roundCornersAction);
            }
        }
        return result;
    }
}
/**
 * @summary action
 * @memberOf Actions.Border
 * @description Sets the style of the border.
 * @param {number | string} width The width in pixels.
 * @param {string} color The color of the border, e.g 'green', 'yellow'.
 * @return {Actions.Border.BorderAction}
 */
function solid(width, color) {
    return new BorderAction('solid', color, width);
}
/**
 * @summary action
 * @memberOf Actions.Border
 * @description Sets the radius of the border.
 * @param {Actions.RoundCorners.RoundCornersAction} roundCorners RoundCorners action.
 * @return {Actions.Border.BorderAction}
 */
function roundCorners(roundCorners) {
    const borderActionInstance = new BorderAction('solid', 'transparent', 0);
    borderActionInstance.roundCorners(roundCorners);
    return borderActionInstance;
}
const Border = {
    solid,
    roundCorners,
};
export { BorderAction, Border, solid, roundCorners };
