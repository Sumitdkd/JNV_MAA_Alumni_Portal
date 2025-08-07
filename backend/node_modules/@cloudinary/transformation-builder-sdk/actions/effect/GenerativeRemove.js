import { Action } from "../../internal/Action.js";
import { QualifierValue } from "../../internal/qualifier/QualifierValue.js";
import { Qualifier } from "../../internal/qualifier/Qualifier.js";
import { RectangleRegion } from "../../qualifiers/region/RectangleRegion.js";
/**
 * @description A class that defines how to remove objects from an asset using Generative AI
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class GenerativeRemove extends Action {
    constructor() {
        super();
        this._prompts = [];
        this._regions = [];
        this._detectMultiple = false;
        this._removeShadow = false;
        this._actionModel.actionType = "generativeRemove";
    }
    prompt(...value) {
        this._prompts = value;
        if (this._prompts.length > 0) {
            this._actionModel.prompts = this._prompts;
        }
        return this;
    }
    region(...value) {
        this._regions = value;
        if (this._regions.length > 0) {
            this._actionModel.regions = this._regions.map((region) => region.toJson());
        }
        return this;
    }
    detectMultiple(value = true) {
        this._detectMultiple = value;
        if (this._detectMultiple) {
            this._actionModel.detectMultiple = this._detectMultiple;
        }
        return this;
    }
    removeShadow(value = true) {
        this._removeShadow = value;
        if (this._removeShadow) {
            this._actionModel.removeShadow = this._removeShadow;
        }
        return this;
    }
    prepareQualifiers() {
        const qualifierValue = new QualifierValue().setDelimiter(";");
        switch (true) {
            case this._prompts.length > 0: {
                qualifierValue.addValue(this.preparePromptValue());
                break;
            }
            case this._regions.length > 0: {
                qualifierValue.addValue(this.prepareRegionValue());
                break;
            }
        }
        if (this._detectMultiple) {
            qualifierValue.addValue("multiple_true");
        }
        if (this._removeShadow) {
            qualifierValue.addValue("remove-shadow_true");
        }
        this.addQualifier(new Qualifier("e", `gen_remove:${qualifierValue.toString()}`));
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
    prepareRegionValue() {
        const regions = this._regions;
        const qualifierValue = new QualifierValue();
        if (regions.length === 1) {
            const singleRegion = regions[0].toString();
            qualifierValue.addValue(`region_${singleRegion}`);
        }
        else {
            const regionList = regions.map((region) => region.toString());
            qualifierValue.addValue(`region_(${regionList.join(";")})`);
        }
        return qualifierValue;
    }
    static fromJson(actionModel) {
        const { prompts, regions, detectMultiple, removeShadow } = actionModel;
        const result = new this();
        if (regions) {
            result.region(...regions.map(({ x, y, width, height }) => new RectangleRegion(x, y, width, height)));
        }
        if (prompts) {
            result.prompt(...prompts);
        }
        if (detectMultiple) {
            result.detectMultiple(detectMultiple);
        }
        if (removeShadow) {
            result.removeShadow(removeShadow);
        }
        return result;
    }
}
export { GenerativeRemove };
