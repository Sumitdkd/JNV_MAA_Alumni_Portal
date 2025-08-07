import { BackgroundQualifier } from "./base/BackgroundQualifier.js";
/**
 * @description Automatically fills the padded area using generative AI to extend the image seamlessly.
 * Optionally include a prompt to guide the image generation.
 * @memberOf Qualifiers.Background
 */
declare class BackgroundGenerativeFillQualifier extends BackgroundQualifier {
    protected _prompt: string | undefined;
    protected _backgroundType: 'generativeFill';
    constructor();
    prompt(prompt: string): BackgroundGenerativeFillQualifier;
    getPrompt(): string | undefined;
    getBackgroundType(): 'generativeFill';
    /**
     * @description
     * Override the toString() function to explicitly stringify the qualifier.
     */
    toString(): string;
}
export { BackgroundGenerativeFillQualifier };
