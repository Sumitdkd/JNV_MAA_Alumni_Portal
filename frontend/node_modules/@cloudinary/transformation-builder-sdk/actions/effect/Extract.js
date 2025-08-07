import { Action } from "../../internal/Action.js";
import { Qualifier } from "../../internal/qualifier/Qualifier.js";
import { QualifierValue } from "../../internal/qualifier/QualifierValue.js";
/**
 * @description Extracts an area or multiple areas of an image, described in natural language.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class Extract extends Action {
    constructor(prompts) {
        super();
        this._prompts = [];
        this._detectMultiple = false;
        this._invert = false;
        this._preserveAlpha = false;
        this._actionModel.actionType = "extract";
        this._prompts = Array.isArray(prompts) ? prompts : [prompts];
        this._actionModel.prompts = this._prompts;
    }
    detectMultiple(value = false) {
        this._detectMultiple = value;
        if (this._detectMultiple) {
            this._actionModel.detectMultiple = this._detectMultiple;
        }
        return this;
    }
    mode(mode) {
        this._mode = mode;
        this._actionModel.mode = this._mode;
        return this;
    }
    invert(value = true) {
        this._invert = value;
        if (this._invert) {
            this._actionModel.invert = this._invert;
        }
        return this;
    }
    preserveAlpha(value = true) {
        this._preserveAlpha = value;
        if (this._preserveAlpha) {
            this._actionModel.preserveAlpha = this._preserveAlpha;
        }
        return this;
    }
    prepareQualifiers() {
        const qualifierValue = new QualifierValue().setDelimiter(";");
        if (this._prompts.length) {
            qualifierValue.addValue(this.preparePromptValue());
        }
        if (this._detectMultiple) {
            qualifierValue.addValue("multiple_true");
        }
        if (this._mode) {
            qualifierValue.addValue(`mode_${this._mode}`);
        }
        if (this._invert) {
            qualifierValue.addValue("invert_true");
        }
        if (this._preserveAlpha) {
            qualifierValue.addValue("preserve-alpha_true");
        }
        this.addQualifier(new Qualifier("e", `extract:${qualifierValue.toString()}`));
    }
    preparePromptValue() {
        const prompts = this._prompts;
        const qualifierValue = new QualifierValue().setDelimiter(";");
        if (prompts.length === 1) {
            qualifierValue.addValue(`prompt_${prompts[0]}`);
        }
        else {
            qualifierValue.addValue(`prompt_(${prompts.join(";")})`);
        }
        return qualifierValue;
    }
    static fromJson(actionModel) {
        const { prompts, detectMultiple, mode, invert, preserveAlpha } = actionModel;
        const result = new this(prompts);
        if (detectMultiple) {
            result.detectMultiple(detectMultiple);
        }
        if (mode) {
            result.mode(mode);
        }
        if (invert) {
            result.invert(invert);
        }
        if (preserveAlpha) {
            result.preserveAlpha(preserveAlpha);
        }
        return result;
    }
}
export { Extract };
