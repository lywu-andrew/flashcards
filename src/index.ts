import { loadCards } from './data/store'
import { newCardDeck } from './ordering/cardproducer'
import { newCardShuffler } from './ordering/prioritization/cardshuffler'
import { newUI } from './ui'

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

const cardDeck = newCardDeck(
  loadCards('cards/designpatterns.csv').getAllCards(),
  newCardShuffler()
)

newUI().studyCards(cardDeck)
