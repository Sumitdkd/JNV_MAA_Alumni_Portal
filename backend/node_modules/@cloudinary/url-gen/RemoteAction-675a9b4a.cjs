'use strict';

var CustomFunctionAction = require('./CustomFunctionAction-a158bea9.cjs');

class RemoteAction extends CustomFunctionAction.CustomFunctionAction {
    constructor(fn) {
        /* istanbul ignore next */
        // Required due to https://github.com/microsoft/TypeScript/issues/13029
        super(fn);
    }
    preprocess() {
        this.pre = 'pre';
        return this;
    }
}
var RemoteAction$1 = RemoteAction;

exports.RemoteAction = RemoteAction$1;
