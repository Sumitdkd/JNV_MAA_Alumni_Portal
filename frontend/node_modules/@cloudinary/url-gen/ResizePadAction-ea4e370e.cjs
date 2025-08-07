'use strict';

var Qualifier = require('./Qualifier-6633a22f.cjs');
var ResizeAdvancedAction = require('./ResizeAdvancedAction-d9fa13e5.cjs');
var BlurredBackgroundAction = require('./BlurredBackgroundAction-76a33e5d.cjs');
var BackgroundAutoBorderQualifier = require('./BackgroundAutoBorderQualifier-b9f58961.cjs');
var BackgroundBorderGradientQualifier = require('./BackgroundBorderGradientQualifier-749ad1ba.cjs');
var BackgroundPredominantGradientQualifier = require('./BackgroundPredominantGradientQualifier-16137fe0.cjs');
var BackgroundAutoPredominantQualifier = require('./BackgroundAutoPredominantQualifier-0964e7f7.cjs');
var background = require('./background-c64752f1.cjs');

/**
 * Get the value of given background
 * @param background
 */
function getBackgroundValue(background) {
    return `${background}`.replace('b_', '');
}
/**
 * Create an IAutoBackgroundModel from given background
 */
function createAutoBackgroundModel() {
    return { backgroundType: 'auto' };
}
/**
 * Create an IBlurredBackgroundModel from given background
 * @param background
 */
function createBlurredBackgroundModel(background) {
    const { intensityLevel, brightnessLevel } = background;
    const result = {
        backgroundType: 'blurred'
    };
    if (intensityLevel || intensityLevel === 0) {
        result.intensity = intensityLevel;
    }
    if (brightnessLevel || brightnessLevel === 0) {
        result.brightness = brightnessLevel;
    }
    return result;
}
/**
 * Create an IContrastPaletteBackgroundModel from given background
 * @param background
 */
function createContrastPaletteBackgroundModel(background) {
    const contrast = background._contrast;
    const palette = background._palette;
    const result = {
        backgroundType: ''
    };
    if (contrast) {
        result.contrast = true;
    }
    if (palette) {
        result.palette = palette;
    }
    return result;
}
/**
 * Create an IBorderBackgroundModel from given background
 * @param background
 */
function createBorderBackgroundModel(background) {
    return Object.assign(Object.assign({}, createContrastPaletteBackgroundModel(background)), { backgroundType: 'border' });
}
/**
 * Create an IBaseGradientBackgroundModel from given background
 * @param background
 */
function createBaseGradientBackgroundModel(background) {
    const gradientColors = background._gradientColors;
    const gradientDirection = `${background._gradientDirection}`;
    const result = createContrastPaletteBackgroundModel(background);
    if (gradientColors) {
        result.gradientColors = gradientColors;
    }
    if (gradientDirection) {
        result.gradientDirection = gradientDirection;
    }
    return result;
}
/**
 * Create an IBorderGradientBackgroundModel from given background
 * @param background
 */
function createBorderGradientBackgroundModel(background) {
    return Object.assign(Object.assign({}, createBaseGradientBackgroundModel(background)), { backgroundType: 'borderGradient' });
}
/**
 * Create an IColorBackgroundModel from given background
 * @param background
 */
function createColorBackgroundModel(background) {
    return {
        backgroundType: 'color',
        color: getBackgroundValue(background)
    };
}
/**
 * Create an IPredominantBackgroundModel from given background
 * @param background
 */
function createPredominantBackgroundModel(background) {
    return Object.assign(Object.assign({}, createContrastPaletteBackgroundModel(background)), { backgroundType: 'predominant' });
}
/**
 * Create an IPredominantGradientBackgroundModel from given background
 * @param background
 */
function createPredominantGradientBackgroundModel(background) {
    return Object.assign(Object.assign({}, createBaseGradientBackgroundModel(background)), { backgroundType: 'predominantGradient' });
}
/**
 * Create an IGenerativeFillBackgroundModel from given background
 * @param urlValue
 */
function createGenerativeFillBackgroundModel(background) {
    return Object.assign({ backgroundType: background.getBackgroundType() }, (background.getPrompt() ? { prompt: background.getPrompt() } : {}));
}
/**
 * Create an IBackgroundModel from given background
 * @param background
 */
function createBackgroundModel(background$1) {
    if (getBackgroundValue(background$1) === 'auto') {
        return createAutoBackgroundModel();
    }
    if (background$1 instanceof BlurredBackgroundAction.BlurredBackgroundAction) {
        return createBlurredBackgroundModel(background$1);
    }
    if (background$1 instanceof BackgroundAutoBorderQualifier.BackgroundAutoBorderQualifier) {
        return createBorderBackgroundModel(background$1);
    }
    if (background$1 instanceof BackgroundBorderGradientQualifier.BackgroundBorderGradientQualifier) {
        return createBorderGradientBackgroundModel(background$1);
    }
    if (background$1 instanceof BackgroundAutoPredominantQualifier.BackgroundAutoPredominantQualifier) {
        return createPredominantBackgroundModel(background$1);
    }
    if (background$1 instanceof BackgroundPredominantGradientQualifier.BackgroundPredominantGradientQualifier) {
        return createPredominantGradientBackgroundModel(background$1);
    }
    if (background$1 instanceof background.BackgroundGenerativeFillQualifier) {
        return createGenerativeFillBackgroundModel(background$1);
    }
    return createColorBackgroundModel(background$1);
}

/**
 * Create BackgroundQualifier from IBlurredBackgroundModel
 * @param backgroundModel
 */
function createBlurredBackground(backgroundModel) {
    const { brightness, intensity } = backgroundModel;
    const result = background.Background.blurred();
    result.brightness(brightness !== null && brightness !== void 0 ? brightness : BlurredBackgroundAction.DEFAULT_BRIGHTNESS);
    result.intensity(intensity !== null && intensity !== void 0 ? intensity : BlurredBackgroundAction.DEFAULT_INTENSITY);
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
            return background.auto();
        case 'blurred':
            return createBlurredBackground(backgroundModel);
        case 'border':
            return createContrastPaletteBackground(background.border(), backgroundModel);
        case 'borderGradient':
            return createGradientBackground(background.borderGradient(), backgroundModel);
        case 'predominant':
            return createContrastPaletteBackground(background.predominant(), backgroundModel);
        case 'predominantGradient':
            return createGradientBackground(background.predominantGradient(), backgroundModel);
        case 'generativeFill':
            return createGenerativeFillBackground(background.generativeFill(), backgroundModel);
        default:
            return background.color(backgroundModel.color);
    }
}

/**
 * @description Defines an advanced resize with padding.
 * @extends Actions.Resize.ResizeAdvancedAction
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
class ResizePadAction extends ResizeAdvancedAction.ResizeAdvancedAction {
    /**
     * @description Sets the background.
     * @param {Qualifiers.Background} backgroundQualifier Defines the background color to use instead of
     * transparent background areas or when resizing with padding.
     */
    background(backgroundQualifier) {
        this._actionModel.background = createBackgroundModel(backgroundQualifier);
        return this.addQualifier(backgroundQualifier);
    }
    /**
     * @description Horizontal position for custom-coordinates based padding.
     * @param {number} x The x position.
     */
    offsetX(x) {
        this._actionModel.x = x;
        return this.addQualifier(new Qualifier.Qualifier('x', x));
    }
    /**
     * @description Vertical position for custom-coordinates based padding
     * @param {number} y The y position.
     */
    offsetY(y) {
        this._actionModel.y = y;
        return this.addQualifier(new Qualifier.Qualifier('y', y));
    }
    static fromJson(actionModel) {
        const result = super.fromJson.apply(this, [actionModel]);
        actionModel.background && result.background(createBackgroundFromModel(actionModel.background));
        actionModel.x && result.offsetX(actionModel.x);
        actionModel.y && result.offsetY(actionModel.y);
        actionModel.zoom && result.zoom(actionModel.zoom);
        return result;
    }
}

exports.ResizePadAction = ResizePadAction;
exports.createBackgroundFromModel = createBackgroundFromModel;
exports.createBackgroundModel = createBackgroundModel;
