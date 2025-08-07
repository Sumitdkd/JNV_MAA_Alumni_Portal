import { Action } from "../../internal/Action.js";
import { QualifierValue } from "../../internal/qualifier/QualifierValue.js";
import { Qualifier } from "../../internal/qualifier/Qualifier.js";
/**
 * @description A class that defines how to recolor objects in an asset using Generative AI
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class GenerativeRecolor extends Action {
    constructor(prompts, color) {
        super();
        this._prompts = [];
        this._detectMultiple = false;
        // Alias method to be backwards compatible
        this.multiple = this.detectMultiple.bind(this);
        this._prompts = Array.isArray(prompts) ? prompts : [prompts];
        this._toColor = color;
        this._actionModel.actionType = "generativeRecolor";
        this._actionModel.prompts = this._prompts;
        this._actionModel.toColor = this._toColor;
    }
    detectMultiple(value = true) {
        this._detectMultiple = value;
        if (this._detectMultiple) {
            this._actionModel.detectMultiple = this._detectMultiple;
        }
        return this;
    }
    prepareQualifiers() {
        const qualifierValue = new QualifierValue().setDelimiter(";");
        if (this._prompts.length) {
            qualifierValue.addValue(this.preparePromptValue());
        }
        if (this._toColor) {
            const formattedColor = this._toColor.match(/^#/)
                ? this._toColor.substr(1)
                : this._toColor;
            qualifierValue.addValue(`to-color_${formattedColor}`);
        }
        if (this._detectMultiple) {
            qualifierValue.addValue("multiple_true");
        }
        this.addQualifier(new Qualifier("e", `gen_recolor:${qualifierValue.toString()}`));
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
        const { prompts, detectMultiple, toColor } = actionModel;
        const result = new this(prompts, toColor);
        if (detectMultiple) {
            result.detectMultiple(detectMultiple);
        }
        return result;
    }
}
export { GenerativeRecolor };
