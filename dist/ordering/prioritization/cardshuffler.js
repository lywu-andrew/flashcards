"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCardShuffler = void 0;
function newCardShuffler() {
    return {
        /**
         * Randomly shuffles the provided cards.
         *
         * @param cards The {@link CardStatus} objects to order.
         * @return The shuffled cards.
         */
        reorganize: function (cards) {
            const c = cards.slice();
            c.sort(() => Math.random() - 0.5);
            return c;
        }
    };
}
exports.newCardShuffler = newCardShuffler;
//# sourceMappingURL=cardshuffler.js.map