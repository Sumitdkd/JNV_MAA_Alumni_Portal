import { Action } from "../../internal/Action.js";
import { IGenerativeRemoveModel } from "../../internal/models/IEffectActionModel.js";
import { RectangleRegion } from "../../qualifiers/region/RectangleRegion.js";
/**
 * @description A class that defines how to remove objects from an asset using Generative AI
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
declare class GenerativeRemove extends Action {
    private _prompts;
    private _regions;
    private _detectMultiple;
    private _removeShadow;
    constructor();
    prompt(...value: string[]): this;
    region(...value: RectangleRegion[]): this;
    detectMultiple(value?: boolean): this;
    removeShadow(value?: boolean): this;
    protected prepareQualifiers(): void;
    private preparePromptValue;
    private prepareRegionValue;
    static fromJson(actionModel: IGenerativeRemoveModel): GenerativeRemove;
}
export { GenerativeRemove };
