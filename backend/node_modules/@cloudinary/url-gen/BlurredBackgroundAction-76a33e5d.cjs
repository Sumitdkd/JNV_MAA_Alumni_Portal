'use strict';

var BackgroundQualifier = require('./BackgroundQualifier-ab682c8f.cjs');

const DEFAULT_INTENSITY = 100;
const DEFAULT_BRIGHTNESS = 0;
/**
 * @description A class for blurred background transformations.
 * @memberOf Qualifiers.Background
 * @extends {Qualifiers.Background.BackgroundQualifier}
 */
class BlurredBackgroundAction extends BackgroundQualifier.BackgroundQualifier {
    /**
     * @description Sets the intensity of the blur.
     * @param {number} value - The intensity of the blur.
     */
    intensity(value) {
        this.intensityLevel = value;
        return this;
    }
    /**
     * @description Sets the brightness of the background.
     * @param {number} value - The brightness of the background.
     */
    brightness(value) {
        this.brightnessLevel = value;
        return this;
    }
    /**
     * @description
     * Stringify the qualifier
     * BackgroundQualifiers don't have a value, but instead override the toString() function
     */
    toString() {
        // b_blurred:{intensity}:{brightness}
        const intensity = this.intensityLevel !== undefined ? `:${this.intensityLevel}` : '';
        const brightness = this.brightnessLevel !== undefined
            ? this.intensityLevel !== undefined
                ? `:${this.brightnessLevel}`
                : `:${DEFAULT_INTENSITY}:${this.brightnessLevel}`
            : '';
        return `b_blurred${intensity}${brightness}`;
    }
}
var BlurredBackgroundAction$1 = BlurredBackgroundAction;

exports.BlurredBackgroundAction = BlurredBackgroundAction$1;
exports.DEFAULT_BRIGHTNESS = DEFAULT_BRIGHTNESS;
exports.DEFAULT_INTENSITY = DEFAULT_INTENSITY;
