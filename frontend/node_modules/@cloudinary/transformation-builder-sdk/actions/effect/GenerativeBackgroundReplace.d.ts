import { Action } from "../../internal/Action.js";
import { IGenerativeBackgroundReplaceModel } from "../../internal/models/IEffectActionModel.js";
/**
 * @description Uses generative AI to replace background of your image with something else.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
declare class GenerativeBackgroundReplace extends Action {
    private _prompt;
    constructor();
    prompt(value: string): GenerativeBackgroundReplace;
    protected prepareQualifiers(): void;
    static fromJson(actionModel: IGenerativeBackgroundReplaceModel): GenerativeBackgroundReplace;
}
export { GenerativeBackgroundReplace };
