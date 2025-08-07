import { Action } from "../../internal/Action.js";
declare type RegionType = "faces" | "ocr_text" | "custom";
/**
 * @memberOf Qualifiers.Region
 */
declare class NamedRegion extends Action {
    regionType: RegionType;
    constructor(type: RegionType);
}
export { NamedRegion, RegionType };
