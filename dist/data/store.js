"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCards = exports.newInMemoryCardStore = void 0;
const flashcard_1 = require("../cards/flashcard");
const fs_1 = __importDefault(require("fs"));
/**
 * Implements a card store in working memory, based on an {@link Array}. The data is initialized with a pre-populated
 * set of default cards.
 */
function newInMemoryCardStore(initialCards) {
    const cards = initialCards.slice();
    return {
        getAllCards: function () { return cards.slice(); },
        addCard: function (card) {
            if (cards.some(v => v.equals(card)))
                return false;
            cards.push(card);
            return true;
        },
        removeCard: function (card) {
            const idx = cards.indexOf(card);
            if (idx === -1)
                return false;
            cards.splice(idx, 1);
            return true;
        },
        /**
         * Creates and returns a new {@link CardStore} where question and answer are swapped on all cards.
         *
         * @return The new, reversed {@link CardStore}.
         */
        invertCards: function () {
            const newCards = [];
            for (const card of cards) {
                newCards.push((0, flashcard_1.newFlashCard)(card.getAnswer(), card.getQuestion()));
            }
            return newInMemoryCardStore(newCards);
        }
    };
}
exports.newInMemoryCardStore = newInMemoryCardStore;
function loadCards(file) {
    const lines = fs_1.default.readFileSync(file).toString().split(/\r?\n/);
    const result = [];
    for (const line of lines) {
        const idx = line.indexOf('--');
        if (idx > 0) {
            result.push((0, flashcard_1.newFlashCard)(line.substring(idx + 2), line.substring(0, idx)));
        }
    }
    return newInMemoryCardStore(result);
}
exports.loadCards = loadCards;
//# sourceMappingURL=store.js.map