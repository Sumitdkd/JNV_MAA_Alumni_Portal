import { Action } from "../../internal/Action.js";
import { Qualifier } from "../../internal/qualifier/Qualifier.js";
import { encodePromptComponent } from "../../internal/utils/encodePromptComponents.js";
/**
 * @description Uses generative AI to replace background of your image with something else.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class GenerativeBackgroundReplace extends Action {
    constructor() {
        super();
        this._actionModel.actionType = "generativeBackgroundReplace";
    }
    prompt(value) {
        try {
            this._actionModel.prompt = decodeURIComponent(value);
        }
        catch (_a) {
            this._actionModel.prompt = value;
        }
        this._prompt = value;
        return this;
    }
    prepareQualifiers() {
        if (!this._prompt) {
            this.addQualifier(new Qualifier("e", "gen_background_replace"));
        }
        else {
            this.addQualifier(new Qualifier("e", `gen_background_replace:prompt_${encodePromptComponent(this._prompt)}`));
        }
    }
    static fromJson(actionModel) {
        const { prompt } = actionModel;
        const result = new this();
        return result.prompt(prompt);
    }
}
export { GenerativeBackgroundReplace };
