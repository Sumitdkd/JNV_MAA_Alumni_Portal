'use strict';

var Action = require('./Action-0ed405c1.cjs');

/**
 * @memberOf Qualifiers.Region
 */
class NamedRegion extends Action.Action {
    constructor(type) {
        super();
        this.regionType = type;
        this._actionModel.regionType = type;
    }
}

exports.NamedRegion = NamedRegion;
