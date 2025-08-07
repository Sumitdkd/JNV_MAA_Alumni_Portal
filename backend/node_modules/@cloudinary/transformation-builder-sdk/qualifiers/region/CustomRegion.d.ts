import { NamedRegion } from "./NamedRegion.js";
import { ICustomRegionModel } from "../../internal/models/IEffectActionModel.js";
/**
 * @memberOf Qualifiers.Region
 */
declare class CustomRegion extends NamedRegion {
    constructor();
    /**
     * @description The x position in pixels.
     * @param {number | string} x
     */
    x(x: number | string): this;
    /**
     * @description The y position in pixels.
     * @param {number | string} y
     */
    y(y: number | string): this;
    /**
     * @description The width of the region in pixels.
     * @param {number | string} width
     */
    width(width: number | string): this;
    /**
     * @description The height of the region in pixels.
     * @param {number | string} height
     */
    height(height: number | string): this;
    static fromJson(model: ICustomRegionModel): CustomRegion;
}
export { CustomRegion };
