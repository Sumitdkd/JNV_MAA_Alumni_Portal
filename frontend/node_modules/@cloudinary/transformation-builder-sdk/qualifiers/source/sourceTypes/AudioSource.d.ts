import { BaseSource } from "../BaseSource.js";
import { IAudioSourceModel } from "../../../internal/models/IAudioSourceModel.js";
import { ITransformationFromJson } from "../../../internal/models/IHasFromJson.js";
/**
 * @memberOf Qualifiers.Source
 * @extends {Qualifiers.Source.AudioSource}
 * @description Defines how to manipulate a Subtitles layer
 */
declare class AudioSource extends BaseSource {
    protected _qualifierModel: IAudioSourceModel;
    constructor(publicId: string);
    /**
     * @description
     * Returns the opening string of the layer,
     * This method is used internally within {@link SDK.LayerAction|LayerAction}
     * @returns {string}
     */
    getOpenSourceString(layerType: 'u' | 'l'): string;
    static fromJson(qualifierModel: IAudioSourceModel, transformationFromJson: ITransformationFromJson): AudioSource;
}
export { AudioSource };
