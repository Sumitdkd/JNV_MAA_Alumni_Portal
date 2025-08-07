import { IActionModel } from "./IActionModel.js";
export interface ITrimActionModel extends IActionModel {
    duration?: string | number;
    startOffset?: "auto" | number;
    endOffset?: "auto" | number;
}
