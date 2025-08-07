'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var TimelinePosition = require('../TimelinePosition-bc131865.cjs');
require('../Action-0ed405c1.cjs');
require('../FlagQualifier-7b069f22.cjs');
require('../QualifierValue-e770d619.cjs');
require('../Qualifier-6633a22f.cjs');
require('../QualifierModel-0923d819.cjs');
require('../unsupportedError-74070138.cjs');

/**
 * @memberOf Qualifiers
 * @description When applying an overlay on a video, this qualifier controls when this overlay is attached
 * @namespace TimelinePosition
 * @see {@link Actions.Overlay| The overlay action}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.TimelinePosition
 * @return {Qualifiers.TimelinePosition.TimelinePosition}
 */
function position() {
    return new TimelinePosition.TimelinePosition();
}
const Timeline = {
    position
};

exports.Timeline = Timeline;
exports.position = position;
