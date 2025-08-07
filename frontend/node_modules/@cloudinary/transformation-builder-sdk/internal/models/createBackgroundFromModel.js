import { Background } from "../../qualifiers.js";
import { auto, border, borderGradient, color, generativeFill, predominant, predominantGradient } from "../../qualifiers/background.js";
import { DEFAULT_BRIGHTNESS, DEFAULT_INTENSITY } from "../../qualifiers/background/shared/BlurredBackgroundAction.js";
/**
 * Create BackgroundQualifier from IBlurredBackgroundModel
 * @param backgroundModel
 */
function createBlurredBackground(backgroundModel) {
    const { brightness, intensity } = backgroundModel;
    const result = Background.blurred();
    result.brightness(brightness !== null && brightness !== void 0 ? brightness : DEFAULT_BRIGHTNESS);
    result.intensity(intensity !== null && intensity !== void 0 ? intensity : DEFAULT_INTENSITY);
    return result;
}
/**
 * Create a gradientBackground from given model
 * @param background
 * @param backgroundModel
 */
function createGradientBackground(background, backgroundModel) {
    const { gradientColors, gradientDirection, contrast, palette } = backgroundModel;
    if (contrast) {
        background.contrast();
    }
    if (palette) {
        background.palette(...palette);
    }
    if (gradientColors) {
        background.gradientColors(+gradientColors);
    }
    if (gradientDirection) {
        background.gradientDirection(gradientDirection);
    }
    return background;
}
/**
 * Crete a background with contrast and palette from given model
 * @param background
 * @param backgroundModel
 */
function createContrastPaletteBackground(background, backgroundModel) {
    const { contrast, palette } = backgroundModel;
    if (contrast) {
        background.contrast();
    }
    if (palette) {
        background.palette(...palette);
    }
    return background;
}
/**
 * Create a Generative Fill background from given model
 * @param background
 * @param backgroundModel
 */
function createGenerativeFillBackground(background, backgroundModel) {
    const { prompt } = backgroundModel;
    if (prompt) {
        background.prompt(prompt);
    }
    return background;
}
/**
 * Create BackgroundQualifier from IBackgroundModel
 * @param backgroundModel
 */
function createBackgroundFromModel(backgroundModel) {
    const { backgroundType } = backgroundModel;
    switch (backgroundType) {
        case 'auto':
            return auto();
        case 'blurred':
            return createBlurredBackground(backgroundModel);
        case 'border':
            return createContrastPaletteBackground(border(), backgroundModel);
        case 'borderGradient':
            return createGradientBackground(borderGradient(), backgroundModel);
        case 'predominant':
            return createContrastPaletteBackground(predominant(), backgroundModel);
        case 'predominantGradient':
            return createGradientBackground(predominantGradient(), backgroundModel);
        case 'generativeFill':
            return createGenerativeFillBackground(generativeFill(), backgroundModel);
        default:
            return color(backgroundModel.color);
    }
}
export { createBackgroundFromModel };
