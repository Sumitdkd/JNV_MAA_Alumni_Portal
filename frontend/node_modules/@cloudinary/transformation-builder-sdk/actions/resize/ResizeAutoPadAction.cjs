'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_qualifier_Qualifier = require('../../internal/qualifier/Qualifier.cjs');
var internal_models_createBackgroundModel = require('../../internal/models/createBackgroundModel.cjs');
var internal_models_createBackgroundFromModel = require('../../internal/models/createBackgroundFromModel.cjs');
var actions_resize_ResizeSimpleAction = require('./ResizeSimpleAction.cjs');
require('../../internal/qualifier/QualifierValue.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../qualifiers/background/shared/BlurredBackgroundAction.cjs');
require('../../qualifiers/background/shared/base/BackgroundQualifier.cjs');
require('../../qualifiers/background/shared/auto/BackgroundAutoBorderQualifier.cjs');
require('../../qualifiers/background/shared/base/BaseCommonBackground.cjs');
require('../../internal/utils/prepareColor.cjs');
require('../../qualifiers/background/shared/gradient/BackgroundBorderGradientQualifier.cjs');
require('../../qualifiers/background/shared/base/BaseGradientBackground.cjs');
require('../../qualifiers/background/shared/gradient/BackgroundPredominantGradientQualifier.cjs');
require('../../qualifiers/background/shared/auto/BackgroundAutoPredominantQualifier.cjs');
require('../../qualifiers/background/shared/BackgroundGenerativeFillQualifier.cjs');
require('../../internal/utils/encodePromptComponents.cjs');
require('../../qualifiers/rotate/RotationModeQualifierValue.cjs');
require('../../qualifiers/region/CustomRegion.cjs');
require('../../qualifiers/region/NamedRegion.cjs');
require('../../internal/Action.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../qualifiers/region/RectangleRegion.cjs');
require('../../qualifiers/position/PositionQualifier.cjs');
require('../../qualifiers/flag.cjs');
require('../../internal/models/createGravityModel.cjs');
require('../../qualifiers/gravity/autoGravity/AutoGravity.cjs');
require('../../qualifiers/gravity/GravityQualifier.cjs');
require('../../qualifiers/gravity/focusOnGravity/FocusOnGravity.cjs');
require('../../qualifiers/gravity.cjs');
require('../../qualifiers/gravity/compassGravity/CompassGravity.cjs');
require('../../qualifiers/gravity/xyCenterGravity/XYCenterGravity.cjs');
require('../../qualifiers/gravity/qualifiers/focusOn/FocusOnValue.cjs');
require('../../qualifiers/gradientDirection/GradientDirectionQualifierValue.cjs');
require('../../qualifiers/format/FormatQualifier.cjs');
require('../../internal/internalConstants.cjs');
require('../../internal/utils/objectFlip.cjs');
require('../../qualifiers/expression/ExpressionQualifier.cjs');
require('../../qualifiers/background.cjs');
require('../../qualifiers/aspectRatio/AspectRatioQualifierValue.cjs');
require('../../qualifiers/animatedFormat/AnimatedFormatQualifierValue.cjs');
require('../../qualifiers/source/sourceTypes/VideoSource.cjs');
require('../../qualifiers/source/BaseSource.cjs');
require('../../qualifiers/source/sourceTypes/ImageSource.cjs');
require('../../qualifiers/source/sourceTypes/SubtitlesSource.cjs');
require('../../qualifiers/source/sourceTypes/BaseTextSource.cjs');
require('../../qualifiers/textStyle.cjs');
require('../../qualifiers/fontWeight.cjs');
require('../../qualifiers/fontStyle.cjs');
require('../../qualifiers/textDecoration.cjs');
require('../../internal/utils/serializeCloudinaryCharacters.cjs');
require('../../qualifiers/textStroke.cjs');
require('../../internal/models/IStrokeModel.cjs');
require('../../qualifiers/source/sourceTypes/FetchSource.cjs');
require('../../internal/utils/base64Encode.cjs');
require('../../qualifiers/source/sourceTypes/TextSource.cjs');
require('../../internal/models/createTextStyleFromModel.cjs');
require('../../qualifiers/source/sourceTypes/AudioSource.cjs');
require('../../internal/utils/toFloatAsString.cjs');

/**
 * @description Tries to prevent a "bad crop" by first attempting to use the auto cropping mode, but adding some padding if the algorithm determines that more of the original image needs to be included in the final image.
 * @extends Actions.Resize.autoPad
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
var ResizeAutoPadAction = /** @class */ (function (_super) {
    tslib_es6.__extends(ResizeAutoPadAction, _super);
    function ResizeAutoPadAction(cropType, cropWidth, cropHeight) {
        var _this = _super.call(this, cropType, cropWidth, cropHeight) || this;
        _this.addQualifier(new internal_qualifier_Qualifier.Qualifier('g', 'auto'));
        return _this;
    }
    /**
     * @description Sets the background.
     * @param {Qualifiers.Background} backgroundQualifier Defines the background color to use instead of
     * transparent background areas or when resizing with padding.
     */
    ResizeAutoPadAction.prototype.background = function (backgroundQualifier) {
        this._actionModel.background = internal_models_createBackgroundModel.createBackgroundModel(backgroundQualifier);
        return this.addQualifier(backgroundQualifier);
    };
    ResizeAutoPadAction.prototype.gravity = function (gravity) {
        // Only `auto` gravity is allowed (and required) for `c_auto_pad` and it's already added automatically in the constructor.
        // Although, this method is needed to exist because it is being shown in autogenerated SDK code snippet.
        return this;
    };
    ResizeAutoPadAction.fromJson = function (actionModel) {
        var result = _super.fromJson.apply(this, [actionModel]);
        actionModel.background && result.background(internal_models_createBackgroundFromModel.createBackgroundFromModel(actionModel.background));
        return result;
    };
    return ResizeAutoPadAction;
}(actions_resize_ResizeSimpleAction.ResizeSimpleAction));

exports.ResizeAutoPadAction = ResizeAutoPadAction;
