'use strict';

var LeveledEffectAction = require('./LeveledEffectAction-c6a11f05.cjs');

/**
 * @description A class for all effects that include a blendPercentage method
 * @extends {Actions.Effect.LeveledEffectAction}
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class EffectActionWithBlend extends LeveledEffectAction.LeveledEffectAction {
    blend(value) {
        return this.setLevel(value);
    }
}

exports.EffectActionWithBlend = EffectActionWithBlend;
