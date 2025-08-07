'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var flag = require('./flag-31bc1b8c.cjs');
var createGravityModel = require('./createGravityModel-e2badc0f.cjs');

/**
 * @description
 * Defines the position of a layer: overlay or underlay.</br>
 * Even though Position is technically an action qualifier, it implements exactly the same functionality as an action.</br>
 * This is true because Position is compounded of multiple qualifiers</br>
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/layers|Applying overlays to images} | {@link https://cloudinary.com/documentation/video_layers|Applying overlays to videos}
 *
 * @extends {SDK.Actions}
 */
class PositionQualifier extends Action.Action {
    constructor() {
        super();
        this._actionModel = {};
    }
    gravity(gravityQualifier) {
        this.addQualifier(gravityQualifier);
        this._actionModel.gravity = createGravityModel.createGravityModel(gravityQualifier);
        return this;
    }
    /**
     * @description Tiles the overlay across your image.
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/layers#automatic_tiling|Tiling overlay}
     */
    tiled() {
        this.addFlag(flag.tiled());
        this._actionModel.tiled = true;
        return this;
    }
    /**
     * TODO - This should accept a boolean value
     * @description Prevents an image or text overlay from extending a delivered image canvas beyond the dimensions of the base image
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#fl_no_overflow|Overflow in overlays}
     */
    allowOverflow(bool = true) {
        if (bool === false) {
            this.addFlag(flag.noOverflow());
        }
        this._actionModel.allowOverflow = bool;
        return this;
    }
    /**
     * @description Set the X Offset
     * @param {number | string} offsetX
     * @return {this}
     */
    offsetX(offsetX) {
        this.addQualifier(new Qualifier.Qualifier('x', offsetX));
        this._actionModel.offsetX = offsetX;
        return this;
    }
    /**
     * @description Set the Y Offset
     * @param {number | string} offsetY
     * @return {this}
     */
    offsetY(offsetY) {
        this.addQualifier(new Qualifier.Qualifier('y', offsetY));
        this._actionModel.offsetY = offsetY;
        return this;
    }
}

exports.PositionQualifier = PositionQualifier;
