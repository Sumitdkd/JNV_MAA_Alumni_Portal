import { IActionModel } from "./IActionModel.js";
import { CornerRadiusValueType } from "./IRoundCornersActionModel.js";
interface IBorderActionModel extends IActionModel {
    width?: number | string;
    color?: string;
    radius?: CornerRadiusValueType;
}
export { IBorderActionModel };
