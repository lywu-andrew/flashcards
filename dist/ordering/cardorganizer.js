"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCombinedCardOrganizer = void 0;
/**
 * A <b>composite</b> class that wraps other {@link CardOrganizer} instances and a list of {@link CardStatus} cards.
 */
function newCombinedCardOrganizer(cardOrganizers) {
    return {
        /**
             * Applies each {@link CardOrganizer} instance to the provided collection of cards. This method makes no guarantees
             * about the order in which the underlying sorters are invoked; the final order may be dependent on this order when
             * conflicting priorities are involved.
             *
             * @param cards The {@link CardStatus} objects to order.
             * @return The final, filtered and ordered list of cards.
             */
        reorganize: function (cards) {
            let status = cards.slice();
            for (const cardOrganizer of cardOrganizers) {
                status = cardOrganizer.reorganize(status);
            }
            return status;
        }
    };
}
exports.newCombinedCardOrganizer = newCombinedCardOrganizer;
//# sourceMappingURL=cardorganizer.js.map