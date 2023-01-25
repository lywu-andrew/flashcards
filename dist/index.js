"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./data/store");
const cardproducer_1 = require("./ordering/cardproducer");
const cardshuffler_1 = require("./ordering/prioritization/cardshuffler");
const ui_1 = require("./ui");
// TODOs
// 1. load command line options
// 2. set up cards and card organizers depending on command line options
// 3. create a card deck and the UI and start the UI with the card deck
// A note about using yargs for your CLI:
// .argv/.parse() may not work as expected in the latest version.
// Instead, you can use .parseSync()
//
// Checkstyle hint: using require() outside of import statements will show an
// error when the linter is run. To avoid using require(), you can import it as
// follows:
// import yargs from 'yargs'
//
// When you want to use yargs, you can just reference it directly as follows:
// yargs(process.argv.slice(2))...
const cardDeck = (0, cardproducer_1.newCardDeck)((0, store_1.loadCards)('cards/designpatterns.csv').getAllCards(), (0, cardshuffler_1.newCardShuffler)());
(0, ui_1.newUI)().studyCards(cardDeck);
//# sourceMappingURL=index.js.map