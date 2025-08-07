import { Action } from "../../internal/Action.js";
/**
 * @memberOf Qualifiers.Region
 */
declare class RectangleRegion extends Action {
    /**
     * Rectangle defines a region where action will be applied
     *
     * @param {number} x The x position in pixels
     * @param {number} y The y position in pixels
     * @param {number} width The width in pixels
     * @param {number} height The height in pixels
     */
    constructor(x: number, y: number, width: number, height: number);
    toString(): string;
}
export { RectangleRegion };
