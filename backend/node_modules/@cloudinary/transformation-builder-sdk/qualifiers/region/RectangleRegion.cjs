'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_qualifier_Qualifier = require('../../internal/qualifier/Qualifier.cjs');
var internal_Action = require('../../internal/Action.cjs');
require('../../internal/qualifier/QualifierValue.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../flag/FlagQualifier.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');

/**
 * @memberOf Qualifiers.Region
 */
var RectangleRegion = /** @class */ (function (_super) {
    tslib_es6.__extends(RectangleRegion, _super);
    /**
     * Rectangle defines a region where action will be applied
     *
     * @param {number} x The x position in pixels
     * @param {number} y The y position in pixels
     * @param {number} width The width in pixels
     * @param {number} height The height in pixels
     */
    function RectangleRegion(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.addQualifier(new internal_qualifier_Qualifier.Qualifier("x", x));
        _this.addQualifier(new internal_qualifier_Qualifier.Qualifier("y", y));
        _this.addQualifier(new internal_qualifier_Qualifier.Qualifier("w", width));
        _this.addQualifier(new internal_qualifier_Qualifier.Qualifier("h", height));
        _this._actionModel = {
            x: x,
            y: y,
            width: width,
            height: height,
        };
        return _this;
    }
    RectangleRegion.prototype.toString = function () {
        var _a = this._actionModel, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        return "(x_" + x + ";y_" + y + ";w_" + width + ";h_" + height + ")";
    };
    return RectangleRegion;
}(internal_Action.Action));

exports.RectangleRegion = RectangleRegion;
