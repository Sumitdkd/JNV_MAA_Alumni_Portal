import { ISourceModel } from "./ISourceModel.js";
import { ITransformationModel } from "./ITransformationModel.js";
export interface IAudioSourceModel extends ISourceModel {
    sourceType: 'audio';
    publicId: string;
    transformation?: ITransformationModel;
}
/**
 * Validates that given obj is an IImageSourceModel
 * @param obj
 */
export declare function isIAudioSourceModel(obj: unknown): obj is IAudioSourceModel;
