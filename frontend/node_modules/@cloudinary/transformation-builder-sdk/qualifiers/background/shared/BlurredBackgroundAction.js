import { BackgroundQualifier } from "./base/BackgroundQualifier.js";
export const DEFAULT_INTENSITY = 100;
export const DEFAULT_BRIGHTNESS = 0;
/**
 * @description A class for blurred background transformations.
 * @memberOf Qualifiers.Background
 * @extends {Qualifiers.Background.BackgroundQualifier}
 */
class BlurredBackgroundAction extends BackgroundQualifier {
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
export default BlurredBackgroundAction;
