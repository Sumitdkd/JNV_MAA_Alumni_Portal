'use strict';

var Blur = require('./Blur-bfbb28a9.cjs');
var Accelerate = require('./Accelerate-269acc42.cjs');
var Loop = require('./Loop-20af27a6.cjs');
var Cartoonify = require('./Cartoonify-10d02441.cjs');
var Outline = require('./Outline-c98a41df.cjs');
var SimpleEffectAction = require('./SimpleEffectAction-aadd7e24.cjs');
var MakeTransparent = require('./MakeTransparent-468ef2ac.cjs');
var Vectorize = require('./Vectorize-83429cdb.cjs');
var SimulateColorBlind = require('./SimulateColorBlind-2a1253bf.cjs');
var EffectActionWithLevel = require('./EffectActionWithLevel-69a976c7.cjs');
var AssistColorBlind = require('./AssistColorBlind-d89f5f85.cjs');
var GradientFade = require('./GradientFade-5fbf7b64.cjs');
var FadeOut = require('./FadeOut-dfe0f0fc.cjs');
var Colorize = require('./Colorize-012fe385.cjs');
var Shadow = require('./Shadow-35824aa8.cjs');
var StyleTransfer = require('./StyleTransfer-34e93b6e.cjs');
var Dither = require('./Dither-6aebc058.cjs');
var Deshake = require('./Deshake-acd938db.cjs');
var Pixelate = require('./Pixelate-f1f2f0f1.cjs');
var EffectActionWithStrength = require('./EffectActionWithStrength-32a97380.cjs');
var Blackwhite = require('./Blackwhite-888c6b63.cjs');
var FadeIn = require('./FadeIn-db605d72.cjs');
var RemoveBackgroundAction = require('./RemoveBackgroundAction-bdeeab1a.cjs');
var Theme = require('./Theme-84161b18.cjs');
var BackgroundRemoval = require('./BackgroundRemoval-8758e15c.cjs');
var DropShadow = require('./DropShadow-76097e92.cjs');
var GenerativeRemove = require('./GenerativeRemove-fb3990b0.cjs');
var GenerativeReplace = require('./GenerativeReplace-688ba16f.cjs');
var GenerativeRecolor = require('./GenerativeRecolor-427c8b81.cjs');
var GenerativeBackgroundReplace = require('./GenerativeBackgroundReplace-204fa1ef.cjs');
var Extract = require('./Extract-48d0f44c.cjs');

/**
 * @summary action
 * @description Applies a blurring filter to the asset.
 * @memberOf Actions.Effect
 * @param {number} blurLevel The strength of the blur. (Range: 1 to 2000, Server default: 100)
 * @return {Actions.Effect.BlurAction}
 */
function blur(blurLevel) {
    return new Blur.BlurAction(blurLevel);
}
/**
 * @summary action
 * @description Converts the image to gray-scale (multiple shades of gray).
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function grayscale() {
    return new SimpleEffectAction.SimpleEffectAction("grayscale");
}
/**
 * @summary action
 * @description Changes the color scheme of the image to sepia.
 * @memberOf Actions.Effect
 * @param {number} level The level of sepia to apply. (Range: 1 to 100, Server default: 80)
 * @return {Actions.Effect.EffectActionWithLevel}
 */
function sepia(level) {
    return new EffectActionWithLevel.EffectActionWithLevel("sepia", level);
}
/**
 * @summary action
 * @description Applies a shadow filter to the asset.
 * @memberOf Actions.Effect
 * @param shadowLevel
 * @return {Actions.Effect.ShadowEffectAction}
 */
function shadow(shadowLevel) {
    return new Shadow.ShadowEffectAction("shadow", shadowLevel);
}
/**
 * @summary action
 * @description Applies a colorizing filter to the asset.
 * @memberOf Actions.Effect
 * @param {number} colorizeLevel The strength of the color. (Range: 0 to 100, Server default: 100)
 * @return {Actions.Effect.ColorizeEffectAction}
 */
function colorize(colorizeLevel) {
    return new Colorize.ColorizeEffectAction("colorize", colorizeLevel);
}
/**
 * @summary action
 * @description Applies an oilPaint filter to the asset.
 * @memberOf Actions.Effect
 * @param {number} oilPaintLevel The strength of the effect. (Range: 0 to 100, Server default: 30)
 * @return {Actions.Effect.EffectActionWithStrength}
 */
function oilPaint(oilPaintLevel) {
    return new EffectActionWithStrength.EffectActionWithStrength("oil_paint", oilPaintLevel);
}
/**
 * @summary action
 * @description Applies an artistic filter to the asset.
 * @memberOf Actions.Effect
 * @param {ArtisticFilterType | string} artisticFilterType
 * @return {Actions.Effect.SimpleEffectAction}
 */
function artisticFilter(artisticFilterType) {
    return new SimpleEffectAction.SimpleEffectAction("art", artisticFilterType);
}
/**
 * @summary action
 * @description Applies a cartoonify effect to the asset.
 * @memberOf Actions.Effect
 * @param cartoonifyLevel The thickness of the lines. (Range: 0 to 100, Server default: 50)
 * @return {Actions.Effect.CartoonifyEffect}
 */
function cartoonify(cartoonifyLevel) {
    return new Cartoonify.CartoonifyEffect("cartoonify", cartoonifyLevel);
}
/**
 * @summary action
 * @description Adds an outline to a transparent image. For examples, see the Image Transformations guide.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.EffectOutline}
 */
function outline() {
    return new Outline.EffectOutline();
}
/**
 * @summary action
 * @description Applies a complex deep learning neural network algorithm that extracts artistic styles from a source image and applies them to the content of a target photograph.<br/>
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/neural_artwork_style_transfer_addon|Neural Artwork Style Transfer}
 * @memberOf Actions.Effect
 * @param {ImageSource} imageSource `import {image} from '@cloudinary/url-gen/qualifiers/sources`
 * @return {Actions.Effect.StyleTransfer}
 */
function styleTransfer(imageSource) {
    return new StyleTransfer.StyleTransfer(imageSource);
}
/**
 * @summary action
 * @description
 * Causes a video clip to play forwards and then backwards.
 * Use in conjunction with trimming parameters ('duration', 'start_offset', or 'end_offset') and the 'loop' effect to deliver a classic (short, repeating) boomerang clip.<br/>
 * For details and examples, see 'Create a boomerang video clip' in the Video Transformations guide.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function boomerang() {
    return new SimpleEffectAction.SimpleEffectAction("boomerang");
}
/**
 * @summary action
 * @description
 * Removes red eyes with the Advanced Facial Attribute Detection add-on.
 * For details, see the Advanced Facial Attribute Detection add-on documentation.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function advancedRedEye() {
    return new SimpleEffectAction.SimpleEffectAction("adv_redeye");
}
/**
 * @summary action
 * @description Converts the image to black and white.
 * @memberOf Actions.Effect
 * @param {number | string} level The balance between black (100) and white (0). (Range: 0 to 100, Server default: 50)
 * @return {Actions.Effect.BlackwhiteEffectAction}
 */
function blackwhite(level) {
    return new Blackwhite.BlackwhiteEffectAction("blackwhite", level);
}
/**
 * @summary action
 * @description Negates the image colors (negative).
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function negate() {
    return new SimpleEffectAction.SimpleEffectAction("negate");
}
/**
 * @summary action
 * @description Removes red eyes in the image.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function redEye() {
    return new SimpleEffectAction.SimpleEffectAction("redeye");
}
/**
 * @summary action
 * @description Plays the video or audio file in reverse.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function reverse() {
    return new SimpleEffectAction.SimpleEffectAction("reverse");
}
/**
 * @summary action
 * @description Changes the speed of the video playback.
 * @memberOf Actions.Effect
 * @param {number} speedIncreasePercent The percentage change of speed. Positive numbers speed up the playback, negative numbers slow down the playback (Range: -50 to 100, Server default: 0)
 * @return {Actions.Effect.AccelerationEffectAction}
 */
function accelerate(speedIncreasePercent) {
    return new Accelerate.AccelerationEffectAction(speedIncreasePercent);
}
/**
 * @summary action
 * @description
 * Fade in at the beginning of the video.
 * For details and examples, see 'Fade in and out' in the Video Transformations guide.
 * @memberOf Actions.Effect
 * @param {number} fadeLength The time in ms for the fade to occur. (Server default: 2000)
 * @return {Actions.Effect.FadeInEffectAction}
 */
function fadeIn(fadeLength) {
    return new FadeIn.FadeInEffectAction(fadeLength);
}
/**
 * @summary action
 * @description
 * Fade out at the end of the video.
 * For details and examples, see 'Fade in and out' in the Video Transformations guide.
 * @memberOf Actions.Effect
 * @param {number} fadeLength The time in ms for the fade to occur. (Server default: 2000)
 * @return {Actions.Effect.FadeoutEffectAction}
 */
function fadeOut(fadeLength) {
    return new FadeOut.FadeOutEffectAction(fadeLength);
}
/**
 * @summary action
 * @description
 * Delivers a video or animated GIF that contains additional loops of the video/GIF.
 * The total number of iterations is the number of additional loops plus one. <br/>
 * For animated GIFs only, you can also specify the loop effect without a numeric value to instruct it to loop the GIF infinitely.
 * @memberOf Actions.Effect
 * @param {number} additionalLoops The additional number of times to play the video or animated GIF.
 * @return {Actions.Effect.LoopEffectAction}
 */
function loop(additionalLoops) {
    return new Loop.LoopEffectAction("loop", additionalLoops);
}
/**
 * @summary action
 * @description
 * Makes the background of the image transparent (or solid white for formats that do not support transparency).
 * The background is determined as all pixels that resemble the pixels on the edges of the image.
 *
 * @memberOf Actions.Effect
 * @param {number} tolerance The tolerance used to accommodate variance in the background color. (Range: 0 to 100, Server default: 10)
 * @return {Actions.Effect.MakeTransparentEffectAction}
 */
function makeTransparent(tolerance) {
    return new MakeTransparent.MakeTransparentEffectAction("make_transparent", tolerance);
}
/**
 * @summary action
 * @description Adds visual noise to the video, visible as a random flicker of "dots" or "snow".
 * @memberOf Actions.Effect
 * @param {number} percentage The percent of noise to apply. (Range: 0 to 100 Server default: 0)
 * @return {Actions.Effect.EffectActionWithLevel}
 */
function noise(percentage) {
    return new EffectActionWithLevel.EffectActionWithLevel("noise", percentage);
}
/**
 * @summary action
 * @description Applies a vignette effect.
 * @memberOf Actions.Effect
 * @param {number} strength The strength of the vignette. (Range: 0 to 100, Server default: 20)
 * @return {Actions.Effect.EffectActionWithStrength}
 */
function vignette(strength) {
    return new EffectActionWithStrength.EffectActionWithStrength("vignette", strength);
}
/**
 * @summary action
 * @description
 * Applies an ordered dither filter to the image.
 * Use the constants defined in {@link Qualifiers.Dither|@cloudinary/url-gen/qualifiers/dither} for ditherType.
 * @memberOf Actions.Effect
 * @param {Qualifiers.Dither} ditherType - The dither type applied to the image
 * @return {Actions.Effect.DitherEffectAction}
 */
function dither(ditherType) {
    return new Dither.DitherEffectAction("ordered_dither", ditherType);
}
/**
 * @summary action
 * @description
 * Vectorizes the image.
 * Notes:
 * To deliver the image as a vector image, make sure to change the format (or URL extension) to a vector format, such as SVG.</br>
 * However, you can also deliver in a raster format if you just want to get the 'vectorized' graphic effect.</br>
 * Large images are scaled down to 1000 pixels in the largest dimension before vectorization.
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.VectorizeEffectAction}
 */
function vectorize() {
    return new Vectorize.VectorizeEffectAction();
}
/**
 * @summary action
 * @description
 * Applies a gradient fade effect from one edge of the image.
 * Use .x() or .y() to indicate from which edge to fade and how much of the image should be faded.
 * Values of x and y can be specified as a percentage (Range: 0.0 to 1.0), or in pixels (integer values). <br/>
 * Positive values fade from the top (y) or left (x). Negative values fade from the bottom (y) or right (x). <br/>
 * By default, the gradient is applied to the top 50% of the image (y = 0.5).<br/>
 * Only one direction can be specified but the fade can be applied symmetrically using the mode parameter. </br>
 * To apply different amounts of fade to multiple edges, use chained fade effects.
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GradientFadeEffectAction}
 */
function gradientFade() {
    return new GradientFade.GradientFadeEffectAction();
}
/**
 * @summary action
 * @description
 * Applies stripes to the image to help people with common color-blind conditions to differentiate between colors that are similar for them.</br>
 * You can replace colors using the xRay() method of the \Cloudinary\Transformation\AssistColorBlind class.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.AssistColorBlindEffectAction}
 */
function assistColorBlind() {
    return new AssistColorBlind.AssistColorBlindEffectAction();
}
/**
 * @summary action
 * @description
 * Simulates the way an image would appear to someone with the specified color blind condition. </br>
 * For a list of supported color blind conditions see {@link Qualifiers.SimulateColorBlindValues| types of color blindness} for possible values
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimulateColorBlindEffectAction}
 */
function simulateColorBlind() {
    return new SimulateColorBlind.SimulateColorBlindEffectAction();
}
/**
 * @summary action
 * @description Removes small motion shifts from the video. with a maximum extent of movement in the horizontal and vertical direction of 32 pixels
 * @memberOf Actions.Effect
 * @return {Actions.Effect.DeshakeEffectAction}
 */
function deshake(pixels) {
    return new Deshake.DeshakeEffectAction("deshake", pixels);
}
/**
 * @summary action
 * @description Supports the concatenation of videos with a custom transition by including a transition video as an
 * additional layer and specifying the transition effect
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function transition() {
    return new SimpleEffectAction.SimpleEffectAction("transition");
}
/**
 * @summary action
 * @description Applies a pixelatering filter to the asset.
 * @memberOf Actions.Effect
 * @param {number} squareSize The squareSize in the pixelation. (Range: 1 to 2000, Server default: 100)
 * @return {Actions.Effect.Pixelate}
 */
function pixelate(squareSize) {
    return new Pixelate.Pixelate(squareSize);
}
/**
 * @summary action
 * @description Makes the background of an image transparent (or solid white for JPGs).</br>
 *              Use when the background is a uniform color.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_bgremoval|Background Removal}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.RemoveBackgroundAction}
 */
function removeBackground() {
    return new RemoveBackgroundAction.RemoveBackgroundAction();
}
/**
 * @summary action
 * @description Uses the Cloudinary AI Background Removal add-on to make the background of an image transparent.</br>
 *              When combined with other transformations, this effect must be specified in the first component.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_background_removal|Background Removal}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.BackgroundRemoval}
 */
function backgroundRemoval() {
    return new BackgroundRemoval.BackgroundRemoval();
}
/**
 * @summary action
 * @description Adds a shadow to the object in an image.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_dropshadow|Drop Shadow}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.DropShadow}
 */
function dropShadow() {
    return new DropShadow.DropShadow();
}
/**
 * @summary action
 * @description Remove objects from an asset using Generative AI
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_remove|Generative Remove}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GenerativeRemove}
 */
function generativeRemove() {
    return new GenerativeRemove.GenerativeRemove();
}
/**
 * @summary action
 * @description Uses generative AI to replace parts of your image with something else.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_replace|Generative Replace}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GenerativeReplace}
 */
function generativeReplace() {
    return new GenerativeReplace.GenerativeReplace();
}
/**
 * @summary action
 * @description Uses generative AI to replace background of your image with something else.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_background_replace|Generative Background Replace}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GenerativeBackgroundReplace}
 */
function generativeBackgroundReplace() {
    return new GenerativeBackgroundReplace.GenerativeBackgroundReplace();
}
/**
 * @summary action
 * @description Extracts an area or multiple areas of an image, described in natural language.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_extract|Extract}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.Extract}
 */
function extract(prompts) {
    return new Extract.Extract(prompts);
}
/**
 * @summary action
 * @description Uses generative AI to recolor objects from your image.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_recolor|Generative Recolor}
 * @param {string | string[]} prompts
 * @param {SystemColors} color
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GenerativeRecolor}
 */
function generativeRecolor(prompts, color) {
    return new GenerativeRecolor.GenerativeRecolor(prompts, color);
}
/**
 * @summary action
 * @description
 * Uses generative AI to restore details in poor quality images
 * or images that may have become degraded through repeated processing and compression.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function generativeRestore() {
    return new SimpleEffectAction.SimpleEffectAction("gen_restore");
}
/**
 * @summary action
 * @description
 * Uses AI-based prediction to add fine detail while upscaling small images.
 * This 'super-resolution' feature scales each dimension by four, multiplying the total number of pixels by 16.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
function upscale() {
    return new SimpleEffectAction.SimpleEffectAction("upscale");
}
/**
 *
 * @description Changes the main background color to the one specified, as if a 'theme change' was applied (e.g. dark mode vs light mode).
 * @param {SystemColors} color
 * @return {Actions.Effect.ThemeEffect}
 */
function theme(color) {
    return new Theme.ThemeEffect(color);
}
/**
 *
 * @description Uses AI to analyze an image and make adjustments to enhance the appeal of the image.
 * @return {Actions.Effect.Enhance}
 */
function enhance() {
    return new SimpleEffectAction.SimpleEffectAction("enhance");
}
/**
 * @description Defines effects that you can apply to transform your assets.
 * @memberOf Actions
 * @namespace Effect
 * @example
 * <caption>An <b>extreme</b> example of using many effects on the same asset</caption>
 * import {Cloudinary} from "@cloudinary/url-gen";
 * // Import everything, or just the action you need for tree-shaking purposes
 * import {Effect, sepia} from "@cloudinary/url-gen/actions/effect";
 * import {ArtisticFilter, alDente} from "@cloudinary/url-gen/qualifiers/artisticFilter";
 * import {ShakeStrength, pixels16} from "@cloudinary/url-gen/qualifiers/shakeStrength";
 * import {cat, dog} from "@cloudinary/url-gen/qualifiers/ForegroundObject";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 *
 * image.effect(Effect.advancedRedEye())
 * .effect(Effect.accelerate())
 * .effect(Effect.accelerate(100))
 * .effect(Effect.accelerate().rate(5))
 * .effect(Effect.boomerang())
 * .effect(Effect.blackwhite())
 * .effect(Effect.blackwhite(10))
 * .effect(Effect.blackwhite().threshold(20))
 * .effect(Effect.fadeIn(100))
 * .effect(Effect.fadeIn().duration(5))
 * .effect(Effect.fadeOut(100))
 * .effect(Effect.fadeOut().duration(5))
 * .effect(Effect.grayscale())
 * .effect(Effect.loop())
 * .effect(Effect.loop(100))
 * .effect(Effect.loop().additionalIterations(5))
 * .effect(Effect.makeTransparent())
 * .effect(Effect.makeTransparent(100))
 * .effect(Effect.makeTransparent().tolerance(5))
 * .effect(Effect.makeTransparent().tolerance(5).colorToReplace('red'))
 * .effect(Effect.noise())
 * .effect(Effect.noise(100))
 * .effect(Effect.noise().level(5))
 * .effect(Effect.negate())
 * .effect(Effect.reverse())
 * .effect(Effect.redEye())
 * .effect(Effect.sepia())
 * .effect(Effect.sepia(100))
 * .effect(Effect.sepia().level(5))
 * .effect(Effect.vignette())
 * .effect(Effect.vignette(100))
 * .effect(Effect.vignette().strength(5))
 * .effect(Effect.deshake())
 * .effect(Effect.deshake(10))
 * .effect(Effect.artisticFilter(alDente())
 * .effect(Effect.deshake().shakeStrength(pixels16()))
 * .effect(Effect.backgroundRemoval().fineEdges(true).hints(cat(), dog())
 * .effect(Effect.generativeRemove().prompt("red car").detectMultiple())
 * .effect(Effect.generativeRemove().region({x: 20, y: 200, width: 100, height: 100}))
 * .effect(Effect.generativeReplace().from("ceiling").to("sunny sky").preserveGeometry(true))
 */
const Effect = {
    pixelate: pixelate,
    deshake: deshake,
    boomerang: boomerang,
    advancedRedEye: advancedRedEye,
    blackwhite,
    negate: negate,
    redEye: redEye,
    reverse: reverse,
    accelerate: accelerate,
    fadeIn: fadeIn,
    fadeOut: fadeOut,
    loop: loop,
    makeTransparent: makeTransparent,
    noise: noise,
    vignette: vignette,
    blur: blur,
    grayscale: grayscale,
    sepia: sepia,
    shadow: shadow,
    colorize: colorize,
    oilPaint: oilPaint,
    artisticFilter: artisticFilter,
    cartoonify: cartoonify,
    outline: outline,
    styleTransfer: styleTransfer,
    gradientFade: gradientFade,
    vectorize: vectorize,
    assistColorBlind: assistColorBlind,
    simulateColorBlind: simulateColorBlind,
    transition: transition,
    dither: dither,
    removeBackground,
    backgroundRemoval,
    dropShadow,
    generativeRemove,
    generativeReplace,
    generativeBackgroundReplace,
    generativeRecolor,
    generativeRestore,
    upscale,
    theme,
    enhance,
    extract
};

exports.Effect = Effect;
exports.accelerate = accelerate;
exports.advancedRedEye = advancedRedEye;
exports.artisticFilter = artisticFilter;
exports.assistColorBlind = assistColorBlind;
exports.backgroundRemoval = backgroundRemoval;
exports.blackwhite = blackwhite;
exports.blur = blur;
exports.boomerang = boomerang;
exports.cartoonify = cartoonify;
exports.colorize = colorize;
exports.deshake = deshake;
exports.dither = dither;
exports.dropShadow = dropShadow;
exports.enhance = enhance;
exports.extract = extract;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.generativeBackgroundReplace = generativeBackgroundReplace;
exports.generativeRecolor = generativeRecolor;
exports.generativeRemove = generativeRemove;
exports.generativeReplace = generativeReplace;
exports.generativeRestore = generativeRestore;
exports.gradientFade = gradientFade;
exports.grayscale = grayscale;
exports.loop = loop;
exports.makeTransparent = makeTransparent;
exports.negate = negate;
exports.noise = noise;
exports.oilPaint = oilPaint;
exports.outline = outline;
exports.pixelate = pixelate;
exports.redEye = redEye;
exports.removeBackground = removeBackground;
exports.reverse = reverse;
exports.sepia = sepia;
exports.shadow = shadow;
exports.simulateColorBlind = simulateColorBlind;
exports.styleTransfer = styleTransfer;
exports.theme = theme;
exports.transition = transition;
exports.upscale = upscale;
exports.vectorize = vectorize;
exports.vignette = vignette;
