'use strict';

var LeveledEffectAction = require('./LeveledEffectAction-c6a11f05.cjs');

/**
 * @description A class that provides a built in level() method that sets the level of the effect
 * @extends {Actions.Effect.LeveledEffectAction}
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class EffectActionWithLevel extends LeveledEffectAction.LeveledEffectAction {
    level(value) {
        this._actionModel.level = value;
        return this.setLevel(value);
    }
}

exports.EffectActionWithLevel = EffectActionWithLevel;
