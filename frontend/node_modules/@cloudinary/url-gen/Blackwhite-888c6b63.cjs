'use strict';

var LeveledEffectAction = require('./LeveledEffectAction-c6a11f05.cjs');

/**
 * @description Converts the image to black and white.
 * @extends LeveledEffectAction
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class BlackwhiteEffectAction extends LeveledEffectAction.LeveledEffectAction {
    threshold(value) {
        return this.setLevel(value);
    }
}

exports.BlackwhiteEffectAction = BlackwhiteEffectAction;
