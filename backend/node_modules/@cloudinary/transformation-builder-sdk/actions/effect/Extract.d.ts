import { Action } from "../../internal/Action.js";
import { IExtractModel } from "../../internal/models/IEffectActionModel.js";
import { ExtractModeType } from "../../types/types.js";
/**
 * @description Extracts an area or multiple areas of an image, described in natural language.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
declare class Extract extends Action {
    private _prompts;
    private _detectMultiple;
    private _mode;
    private _invert;
    private _preserveAlpha;
    constructor(prompts: string | string[]);
    detectMultiple(value?: boolean): this;
    mode(mode?: ExtractModeType): this;
    invert(value?: boolean): this;
    preserveAlpha(value?: boolean): this;
    protected prepareQualifiers(): void;
    private preparePromptValue;
    static fromJson(actionModel: IExtractModel): Extract;
}
export { Extract };
