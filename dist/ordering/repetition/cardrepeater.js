"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRepeatingCardOrganizer = exports.newNonRepeatingCardOrganizer = void 0;
function newCardRepeater(isComplete) {
    /**
       * Checks whether the provided card needs to be repeated. If {@code false}, it will be filtered from the
       * {@link CardRepeater#reorganize(List)} process.
       *
       * @param card The {@link CardStatus} object to check.
       * @return Whether the user needs to keep studying this card.
       */
    function isNotComplete(card) { return !isComplete(card); }
    return {
        /**
           * Removes all cards that require no more repetition.
           *
           * @param cards The {@link CardStatus} objects to order.
           * @return The filtered cards, in no particular order.
           */
        reorganize: function (cards) {
            return cards.filter(isNotComplete);
        }
    };
}
/**
 * Returns every {@link FlashCard} exactly once, regardless of the correctness of the response.
 */
function newNonRepeatingCardOrganizer() {
    /**
       * Checks if the provided card has not yet been answered, correctly or otherwise.
       *
       * @param card The {@link CardStatus} object to check.
       * @return {@code true} if this card has received one or more answers.
       */
    function anyAnswer(card) {
        // Completion is marked by having been answered at least once, regardless of the correctness of that response.
        return card.getResults().length > 0;
    }
    return newCardRepeater(anyAnswer);
}
exports.newNonRepeatingCardOrganizer = newNonRepeatingCardOrganizer;
/**
 * Ensures that every {@link FlashCard} is answered correctly a given number of times.
 * {@code repetitions} must be positive
 *
 * @throws RangeError when the number of repetitions is non-positive.
 */
function newRepeatingCardOrganizer(repetitions) {
    if (repetitions < 1) {
        throw new RangeError('repetitions must be positive');
    }
    /**
       * Checks if the provided card has been answered correctly the required number of times.
       *
       * @param card The {@link CardStatus} object to check.
       * @return {@code true} if this card has been answered correctly at least {@code this.repetitions} times.
       */
    function hasSufficientSuccess(card) {
        return card.getResults().filter((c) => c).length >= repetitions;
    }
    return newCardRepeater(hasSufficientSuccess);
}
exports.newRepeatingCardOrganizer = newRepeatingCardOrganizer;
//# sourceMappingURL=cardrepeater.js.map