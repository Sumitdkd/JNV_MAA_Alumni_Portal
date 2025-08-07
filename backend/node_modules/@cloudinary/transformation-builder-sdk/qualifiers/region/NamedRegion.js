import { Action } from "../../internal/Action.js";
/**
 * @memberOf Qualifiers.Region
 */
class NamedRegion extends Action {
    constructor(type) {
        super();
        this.regionType = type;
        this._actionModel.regionType = type;
    }
}
export { NamedRegion };
