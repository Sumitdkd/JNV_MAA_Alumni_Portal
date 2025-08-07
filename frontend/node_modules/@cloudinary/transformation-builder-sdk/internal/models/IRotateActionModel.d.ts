import { IActionModel } from "./IActionModel.js";
import { RotationModeType } from "../../types/types.js";
import { RotationModeQualifierValue } from "../../qualifiers/rotate/RotationModeQualifierValue.js";
interface IRotateByAngleActionModel extends IActionModel {
    angle?: number;
    mode?: RotationModeQualifierValue | RotationModeType | string;
}
export { IRotateByAngleActionModel };
