"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMostMistakesFirstSorter = void 0;
function newMostMistakesFirstSorter() {
    function numberOfFailures(cardStatus) {
        return cardStatus.getResults().filter((e) => !e).length;
    }
    return {
        /**
           * Orders the cards by the number of incorrect answers provided for them.
           *
           * @param cards The {@link CardStatus} objects to order.
           * @return The ordered cards.
           */
        reorganize: function (cards) {
            const c = cards.slice();
            c.sort((a, b) => numberOfFailures(a) > numberOfFailures(b) ? -1 : (numberOfFailures(a) < numberOfFailures(b) ? 1 : 0));
            return c;
        }
    };
}
exports.newMostMistakesFirstSorter = newMostMistakesFirstSorter;
//# sourceMappingURL=mostmistakes.js.map