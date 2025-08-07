import { BaseSource } from "../BaseSource.js";
/**
 * @memberOf Qualifiers.Source
 * @extends {Qualifiers.Source.AudioSource}
 * @description Defines how to manipulate a Subtitles layer
 */
class AudioSource extends BaseSource {
    constructor(publicId) {
        super();
        this._qualifierModel = {
            sourceType: 'audio',
            publicId
        };
    }
    /**
     * @description
     * Returns the opening string of the layer,
     * This method is used internally within {@link SDK.LayerAction|LayerAction}
     * @returns {string}
     */
    getOpenSourceString(layerType) {
        const encodedPublicID = this.encodeAssetPublicID(this._qualifierModel.publicId);
        return `${layerType}_audio:${encodedPublicID}`;
    }
    static fromJson(qualifierModel, transformationFromJson) {
        const { publicId, transformation } = qualifierModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [qualifierModel])
        // This allows the inheriting classes to determine the class to be created
        // @ts-ignore
        const result = new this(publicId);
        if (transformation) {
            result.transformation(transformationFromJson(transformation));
        }
        return result;
    }
}
export { AudioSource };
