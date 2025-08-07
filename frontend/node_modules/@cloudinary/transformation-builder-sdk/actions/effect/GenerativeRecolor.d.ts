import { Action } from "../../internal/Action.js";
import { IGenerativeRecolorModel } from "../../internal/models/IEffectActionModel.js";
import { SystemColors } from "../../qualifiers/color.js";
/**
 * @description A class that defines how to recolor objects in an asset using Generative AI
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
declare class GenerativeRecolor extends Action {
    private _prompts;
    private _detectMultiple;
    private _toColor;
    constructor(prompts: string | string[], color: SystemColors);
    detectMultiple(value?: boolean): this;
    multiple: any;
    protected prepareQualifiers(): void;
    private preparePromptValue;
    static fromJson(actionModel: IGenerativeRecolorModel): GenerativeRecolor;
}
export { GenerativeRecolor };
