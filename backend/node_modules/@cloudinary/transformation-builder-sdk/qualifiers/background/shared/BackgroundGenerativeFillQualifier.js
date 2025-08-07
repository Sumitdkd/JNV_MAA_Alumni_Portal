import { encodePromptComponent } from "../../../internal/utils/encodePromptComponents.js";
import { BackgroundQualifier } from "./base/BackgroundQualifier.js";
/**
 * @description Automatically fills the padded area using generative AI to extend the image seamlessly.
 * Optionally include a prompt to guide the image generation.
 * @memberOf Qualifiers.Background
 */
class BackgroundGenerativeFillQualifier extends BackgroundQualifier {
    constructor() {
        super("gen_fill");
        this._backgroundType = 'generativeFill';
    }
    prompt(prompt) {
        try {
            this._prompt = decodeURIComponent(prompt);
        }
        catch (_a) {
            this._prompt = prompt;
        }
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
        return `b_gen_fill${this._prompt ? `:prompt_${encodePromptComponent(this._prompt)}` : ''}`;
    }
}
export { BackgroundGenerativeFillQualifier };
