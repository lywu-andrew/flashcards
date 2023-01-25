"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUI = void 0;
const readline_sync_1 = __importDefault(require("readline-sync"));
function newUI() {
    function cueAllCards(producer) {
        for (const cardStatus of producer.getCards()) {
            const card = cardStatus.getCard();
            const correctAnswer = cueCard(card);
            cardStatus.recordResult(correctAnswer);
        }
    }
    function cueCard(card) {
        console.log('\nNext cue: ' + card.getQuestion());
        const line = readline_sync_1.default.question('answer> ');
        const success = card.checkSuccess(line);
        if (success) {
            console.log("That's correct!");
        }
        else {
            console.log('That is incorrect; the correct response was: ' +
                card.getAnswer());
        }
        return success;
    }
    return {
        /**
             * Prompts the user with {@link FlashCard} cards until the {@link CardProducer} is exhausted.
             * @param cardProducer The {@link CardProducer} to use for organizing cards.
             * @param learnTitles Whether to prompt with definitions and require the user to provide titles.
             */
        studyCards(producer) {
            while (!producer.isComplete()) {
                console.log(`${producer.countCards()} cards to go...`);
                cueAllCards(producer);
                console.log('Reached the end of the card deck, reorganizing...');
                producer.reorganize();
            }
            console.log('Finished all cards. Yay.');
        }
    };
}
exports.newUI = newUI;
//# sourceMappingURL=ui.js.map