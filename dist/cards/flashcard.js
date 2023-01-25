"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFlashCard = void 0;
/**
 * create a new flashcard with a title and a definition
 * @param title
 * @param definition
 * @returns new flash card
 */
function newFlashCard(question, answer) {
    return {
        getQuestion: function () { return question; },
        getAnswer: function () { return answer; },
        checkSuccess: function (response) {
            return answer.trim().toLowerCase() === response.trim().toLowerCase();
        },
        toString: () => {
            return 'FlashCard[' + question + ', ' + answer + ']';
        },
        equals: function (otherCard) {
            return otherCard.getAnswer() === answer && otherCard.getQuestion() === question;
        }
    };
}
exports.newFlashCard = newFlashCard;
//# sourceMappingURL=flashcard.js.map