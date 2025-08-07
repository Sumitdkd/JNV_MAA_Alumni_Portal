'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Uses generative AI to replace background of your image with something else.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class GenerativeBackgroundReplace extends Action.Action {
    constructor() {
        super();
        this._actionModel.actionType = "generativeBackgroundReplace";
    }
    prompt(value) {
        this._prompt = value;
        this._actionModel.prompt = value;
        return this;
    }
    prepareQualifiers() {
        if (!this._prompt) {
            this.addQualifier(new Qualifier.Qualifier("e", "gen_background_replace"));
        }
        else {
            this.addQualifier(new Qualifier.Qualifier("e", `gen_background_replace:prompt_${this._prompt}`));
        }
    }
    static fromJson(actionModel) {
        const { prompt } = actionModel;
        const result = new this();
        return result.prompt(prompt);
    }
}

exports.GenerativeBackgroundReplace = GenerativeBackgroundReplace;
