import { CustomRegion } from "./region/CustomRegion.js";
import { NamedRegion } from "./region/NamedRegion.js";
import { RectangleRegion } from "./region/RectangleRegion.js";
/**
 * @summary qualifier
 * @memberOf Qualifiers.Region
 * @return {Qualifiers.Region.CustomRegion}
 */
declare function custom(): CustomRegion;
/**
 * @summary qualifier
 * @memberOf Qualifiers.Region
 * @return {Qualifiers.Region.NamedRegion}
 */
declare function faces(): NamedRegion;
/**
 * @summary qualifier
 * @memberOf Qualifiers.Region
 * @return {Qualifiers.Region.NamedRegion}
 */
declare function ocr(): NamedRegion;
/**
 * @summary qualifier
 * @memberOf Qualifiers.Region
 * @return {Qualifiers.Region.RectangleRegion}
 */
declare function rectangle(x: number, y: number, width: number, height: number): RectangleRegion;
/**
 * @description Contains functions to select the type of region, used with Effect.blur() and Effect.pixelate().
 * <b>See also</b>: {@link Actions.Effect.BlurAction|Blur Action}
 * <b>See also</b>: {@link Actions.Effect.Pixelate|Blur Action}
 * <b>See also</b>: {@link Actions.Effect|Possible effects}
 * @namespace Region
 * @memberOf Qualifiers
 */
declare const Region: {
    ocr: typeof ocr;
    faces: typeof faces;
    custom: typeof custom;
    rectangle: typeof rectangle;
};
export { Region, ocr, faces, custom, rectangle };
