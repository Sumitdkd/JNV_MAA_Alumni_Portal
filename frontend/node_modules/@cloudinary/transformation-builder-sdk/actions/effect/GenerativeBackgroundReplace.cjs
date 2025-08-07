'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_Action = require('../../internal/Action.cjs');
var internal_qualifier_Qualifier = require('../../internal/qualifier/Qualifier.cjs');
var internal_utils_encodePromptComponents = require('../../internal/utils/encodePromptComponents.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/qualifier/QualifierValue.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');

/**
 * @description Uses generative AI to replace background of your image with something else.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
var GenerativeBackgroundReplace = /** @class */ (function (_super) {
    tslib_es6.__extends(GenerativeBackgroundReplace, _super);
    function GenerativeBackgroundReplace() {
        var _this = _super.call(this) || this;
        _this._actionModel.actionType = "generativeBackgroundReplace";
        return _this;
    }
    GenerativeBackgroundReplace.prototype.prompt = function (value) {
        try {
            this._actionModel.prompt = decodeURIComponent(value);
        }
        catch (_a) {
            this._actionModel.prompt = value;
        }
        this._prompt = value;
        return this;
    };
    GenerativeBackgroundReplace.prototype.prepareQualifiers = function () {
        if (!this._prompt) {
            this.addQualifier(new internal_qualifier_Qualifier.Qualifier("e", "gen_background_replace"));
        }
        else {
            this.addQualifier(new internal_qualifier_Qualifier.Qualifier("e", "gen_background_replace:prompt_" + internal_utils_encodePromptComponents.encodePromptComponent(this._prompt)));
        }
    };
    GenerativeBackgroundReplace.fromJson = function (actionModel) {
        var prompt = actionModel.prompt;
        var result = new this();
        return result.prompt(prompt);
    };
    return GenerativeBackgroundReplace;
}(internal_Action.Action));

exports.GenerativeBackgroundReplace = GenerativeBackgroundReplace;
