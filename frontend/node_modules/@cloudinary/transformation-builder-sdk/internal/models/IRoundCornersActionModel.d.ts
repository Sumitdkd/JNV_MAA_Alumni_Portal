import { IActionModel } from "./IActionModel.js";
declare type CornerRadiusValueType = [number?, number?, number?, number?] | 'max';
interface IRoundCornersActionModel extends IActionModel {
    radius?: CornerRadiusValueType;
}
export { IRoundCornersActionModel, CornerRadiusValueType };
