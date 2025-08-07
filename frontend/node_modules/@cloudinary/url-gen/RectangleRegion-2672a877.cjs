'use strict';

var Qualifier = require('./Qualifier-6633a22f.cjs');
var Action = require('./Action-0ed405c1.cjs');

/**
 * @memberOf Qualifiers.Region
 */
class RectangleRegion extends Action.Action {
    /**
     * Rectangle defines a region where action will be applied
     *
     * @param {number} x The x position in pixels
     * @param {number} y The y position in pixels
     * @param {number} width The width in pixels
     * @param {number} height The height in pixels
     */
    constructor(x, y, width, height) {
        super();
        this.addQualifier(new Qualifier.Qualifier("x", x));
        this.addQualifier(new Qualifier.Qualifier("y", y));
        this.addQualifier(new Qualifier.Qualifier("w", width));
        this.addQualifier(new Qualifier.Qualifier("h", height));
        this._actionModel = {
            x,
            y,
            width,
            height,
        };
    }
    toString() {
        const { x, y, width, height } = this._actionModel;
        return `(x_${x};y_${y};w_${width};h_${height})`;
    }
}

exports.RectangleRegion = RectangleRegion;
