'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @description
 * Defines the mode of blending to use when overlaying an image.
 * Even though BlendMode is technically an actionQualifier, it implements exactly the same functionality as an action.
 * This is true because Position is actually compounded of multiple qualifiers
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#blending_and_masking_layers|Overlay blending effects}
 *
 * @memberOf Qualifiers.BlendMode
 * @extends SDK.Action
 */
class BlendModeQualifier extends Action.Action {
    constructor(blendMode, level) {
        super();
        this.addQualifier(new Qualifier.Qualifier('e', new QualifierValue.QualifierValue([blendMode, level])));
    }
}

exports.BlendModeQualifier = BlendModeQualifier;
