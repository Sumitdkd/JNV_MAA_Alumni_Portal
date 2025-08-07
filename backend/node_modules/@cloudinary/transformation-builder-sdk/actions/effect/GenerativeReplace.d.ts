import { Action } from "../../internal/Action.js";
import { IGenerativeReplaceModel } from "../../internal/models/IEffectActionModel.js";
/**
 * @description Uses generative AI to replace parts of your image with something else.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
declare class GenerativeReplace extends Action {
    private _from;
    private _to;
    private _preserveGeometry;
    private _detectMultiple;
    constructor();
    from(value: string): GenerativeReplace;
    to(value: string): GenerativeReplace;
    preserveGeometry(value?: boolean): GenerativeReplace;
    detectMultiple(value?: boolean): this;
    protected prepareQualifiers(): void;
    static fromJson(actionModel: IGenerativeReplaceModel): GenerativeReplace;
}
export { GenerativeReplace };
