'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var internal_utils_unsupportedError = require('../utils/unsupportedError.cjs');
require('../../tslib.es6-7a681263.cjs');

/**
 * Returns the action's model
 */
function actionToJson() {
    var _a, _b, _c;
    var actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
    var sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.transformation) === null || _c === void 0 ? void 0 : _c.error;
    // Should return error when there is unsupported transformation inside
    if (sourceTransformationError && sourceTransformationError instanceof Error) {
        return { error: sourceTransformationError };
    }
    if (actionModelIsNotEmpty) {
        return this._actionModel;
    }
    return { error: internal_utils_unsupportedError.createUnsupportedError("unsupported action " + this.constructor.name) };
}

exports.actionToJson = actionToJson;
