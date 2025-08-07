import { IActionModel } from "./IActionModel.js";
import { IColorModel } from "./IColorModel.js";
interface IBackgroundColorActionModel extends IActionModel {
    color: IColorModel;
}
export { IBackgroundColorActionModel };
