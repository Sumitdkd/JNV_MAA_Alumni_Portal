import { IActionModel } from "./IActionModel.js";
import { ForegroundObjectValue } from "../../qualifiers/foregroundObject.js";
import { SystemColors } from "../../qualifiers/color.js";
import { ExtractModeType } from "../../types/types.js";
interface IEffectActionWithLevelModel extends IActionModel {
    level?: number;
}
interface IAccelerateActionModel extends IActionModel {
    rate?: number | string;
}
interface ISimpleEffectActionModel extends IActionModel {
}
interface IShadowEffectActionModel extends IActionModel {
    strength?: number;
    offsetX?: string | number;
    offsetY?: string | number;
    color?: string;
}
interface IColorizeModel extends IActionModel {
    level?: number;
    color?: string;
}
interface IBackgroundRemovalModel extends IActionModel {
    fineEdges?: boolean;
    hints?: Array<ForegroundObjectValue>;
}
interface ICartoonifyEffectModel extends IActionModel {
    lineStrength?: number;
    blackAndWhite?: boolean;
    colorReductionLevel?: number;
}
interface IEffectOutlineModel extends IActionModel {
    mode?: string;
    color?: string;
    width?: number;
    blurLevel?: number;
}
interface IDropShadowModel extends IActionModel {
    azimuth?: number;
    elevation?: number;
    spread?: number;
}
interface IMakeTransparentEffectModel extends IActionModel {
    tolerance?: number;
    color?: string;
}
interface IDitherModel extends IActionModel {
    type?: number;
}
interface IVectorizeEffectModel extends IActionModel {
    numOfColors?: number;
    detailLevel?: number;
    despeckleLevel?: number;
    paths?: number;
    cornersLevel?: number;
}
interface IGradientFadeEffecModel extends IActionModel {
    strength?: number;
    type?: string;
    verticalStartPoint?: string;
    horizontalStartPoint?: string;
}
interface IAssistColorBlindEffectModel extends IActionModel {
    type?: string;
    stripesStrength?: number;
}
interface ISimulateColorBlindEffectModel extends IActionModel {
    condition?: string;
}
interface IDeshakeEffectModel extends IActionModel {
    pixels?: 16 | 32 | 48 | 64;
}
interface IPixelateModel extends IActionModel {
    squareSize?: number;
    region?: {
        regionType?: string;
    };
}
interface IBlurModel extends IActionModel {
    strength?: number;
    region?: IRegionModel;
}
export declare type IRegionModel = ICustomRegionModel | IFacesRegionModel | IOcrTextRegionModel;
export interface ICustomRegionModel {
    regionType: 'custom';
    width?: number | string;
    height?: number | string;
    x?: number | string;
    y?: number | string;
}
export interface IFacesRegionModel {
    regionType: 'faces';
}
export interface IOcrTextRegionModel {
    regionType: 'ocr_text';
}
interface IFadeInEffectActionModel extends IActionModel {
    length?: number;
}
interface IFadeOutEffectActionModel extends IActionModel {
    length?: number;
}
interface IGenerativeRemoveModel extends IActionModel {
    prompts?: Array<string>;
    regions?: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    detectMultiple?: boolean;
    removeShadow?: boolean;
}
interface IGenerativeRecolorModel extends IActionModel {
    prompts?: Array<string>;
    detectMultiple?: boolean;
    toColor?: SystemColors | string;
}
interface IGenerativeReplaceModel extends IActionModel {
    from?: string;
    to?: string;
    preserveGeometry?: boolean;
    detectMultiple?: boolean;
}
interface IGenerativeBackgroundReplaceModel extends IActionModel {
    prompt?: string;
}
interface IBackgroundColorModel extends IActionModel {
    color?: SystemColors | string;
}
interface IExtractModel extends IActionModel {
    prompts: Array<string>;
    detectMultiple?: boolean;
    mode?: ExtractModeType;
    invert?: boolean;
    preserveAlpha?: boolean;
}
export { IEffectActionWithLevelModel, ISimpleEffectActionModel, IShadowEffectActionModel, IColorizeModel, ICartoonifyEffectModel, IEffectOutlineModel, IMakeTransparentEffectModel, IDitherModel, IVectorizeEffectModel, IGradientFadeEffecModel, IAssistColorBlindEffectModel, ISimulateColorBlindEffectModel, IDeshakeEffectModel, IPixelateModel, IBlurModel, IFadeInEffectActionModel, IFadeOutEffectActionModel, IAccelerateActionModel, IBackgroundRemovalModel, IDropShadowModel, IGenerativeRemoveModel, IGenerativeReplaceModel, IGenerativeRecolorModel, IGenerativeBackgroundReplaceModel, IBackgroundColorModel, IExtractModel };
