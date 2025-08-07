'use strict';

var prepareColor = require('./prepareColor-c03e99eb.cjs');
var BackgroundAutoBorderQualifier = require('./BackgroundAutoBorderQualifier-b9f58961.cjs');
var BackgroundBorderGradientQualifier = require('./BackgroundBorderGradientQualifier-749ad1ba.cjs');
var BackgroundAutoPredominantQualifier = require('./BackgroundAutoPredominantQualifier-0964e7f7.cjs');
var BackgroundPredominantGradientQualifier = require('./BackgroundPredominantGradientQualifier-16137fe0.cjs');
var BlurredBackgroundAction = require('./BlurredBackgroundAction-76a33e5d.cjs');
var BackgroundQualifier = require('./BackgroundQualifier-ab682c8f.cjs');

/**
 * @description Automatically fills the padded area using generative AI to extend the image seamlessly.
 * Optionally include a prompt to guide the image generation.
 * @memberOf Qualifiers.Background
 */
class BackgroundGenerativeFillQualifier extends BackgroundQualifier.BackgroundQualifier {
    constructor() {
        super("gen_fill");
        this._backgroundType = 'generativeFill';
    }
    prompt(prompt) {
        this._prompt = prompt;
        return this;
    }
    getPrompt() {
        return this._prompt;
    }
    getBackgroundType() {
        return this._backgroundType;
    }
    /**
     * @description
     * Override the toString() function to explicitly stringify the qualifier.
     */
    toString() {
        return `b_gen_fill${this._prompt ? `:prompt_${this._prompt}` : ''}`;
    }
}

/**
 * @description Defines the background color to use instead of transparent background areas or when resizing with padding.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#setting_background_color|Setting background for images} | {@link https://cloudinary.com/documentation/video_effects_and_enhancements#background_color|Setting background for videos}
 *
 * @namespace Background
 * @memberOf Qualifiers
 */
/**
 * @summary qualifier
 * @description Selects the predominant color while taking only the image border pixels into account.
 * @memberOf Qualifiers.Background
 * @return {BackgroundAutoBorderQualifier}
 */
function border() {
    return new BackgroundAutoBorderQualifier.BackgroundAutoBorderQualifier();
}
/**
 * @summary qualifier
 * @description Automatically determines the color to use for padding, if needed when resizing an asset.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#content_aware_padding|Content-aware padding}
 * @memberOf Qualifiers.Background
 * @return {Qualifiers.Background.BackgroundQualifier}
 */
function auto() {
    return new BackgroundQualifier.BackgroundQualifier('auto');
}
/**
 * @summary qualifier
 * @description Applies a padding gradient fade effect using the predominant colors in the border of the image.
 * @memberOf Qualifiers.Background
 * @return {BackgroundBorderGradientQualifier}
 */
function borderGradient() {
    return new BackgroundBorderGradientQualifier.BackgroundBorderGradientQualifier();
}
/**
 * @summary qualifier
 * @description Applies a padding gradient fade effect using the predominant colors in the image.
 * @memberOf Qualifiers.Background
 * @return {BackgroundPredominantGradientQualifier}
 */
function predominantGradient() {
    return new BackgroundPredominantGradientQualifier.BackgroundPredominantGradientQualifier();
}
/**
 * @summary qualifier
 * @description Selects the predominant color while taking all pixels in the image into account
 * @memberOf Qualifiers.Background
 * @return {BackgroundAutoPredominantQualifier}
 */
function predominant() {
    return new BackgroundAutoPredominantQualifier.BackgroundAutoPredominantQualifier();
}
/**
 * @summary qualifier
 * @description Selects the predominant color while taking all pixels in the image into account.
 * @memberOf Qualifiers.Background
 * @return {Qualifiers.Background.BackgroundQualifier}
 */
function color(colorStr) {
    return new BackgroundQualifier.BackgroundQualifier(prepareColor.prepareColor(colorStr));
}
/**
 * @summary qualifier
 * @description Selects the predominant color while taking all pixels in the image into account.
 * @memberOf Qualifiers.Background
 * @return {BlurredBackgroundAction}
 */
function blurred() {
    return new BlurredBackgroundAction.BlurredBackgroundAction();
}
/**
 * @summary qualifier
 * @description A qualifier that automatically fills the padded area using generative AI to extend the image seamlessly.
 * @memberOf Qualifiers.Background
 * @return {BackgroundGenerativeFillQualifier}
 */
function generativeFill() {
    return new BackgroundGenerativeFillQualifier();
}
const Background = {
    auto,
    border,
    borderGradient,
    predominantGradient,
    predominant,
    color,
    blurred,
    generativeFill
};

exports.Background = Background;
exports.BackgroundGenerativeFillQualifier = BackgroundGenerativeFillQualifier;
exports.auto = auto;
exports.blurred = blurred;
exports.border = border;
exports.borderGradient = borderGradient;
exports.color = color;
exports.generativeFill = generativeFill;
exports.predominant = predominant;
exports.predominantGradient = predominantGradient;
