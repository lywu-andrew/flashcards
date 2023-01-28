import { loadCards } from './data/store'
import { newCardDeck } from './ordering/cardproducer'
import { newRepeatingCardOrganizer } from './ordering/repetition/cardrepeater'
import { newCardShuffler } from './ordering/prioritization/cardshuffler'
import { newRecentMistakesFirstSorter } from './ordering/prioritization/recentmistakes'
import { newMostMistakesFirstSorter } from './ordering/prioritization/mostmistakes'
import { newCombinedCardOrganizer } from './ordering/cardorganizer'
import { newUI } from './ui'
import yargs from 'yargs'

const pkg = yargs(process.argv.slice(2))

pkg
  .scriptName('flashcard')
  .help('help')
  .usage('<cards-file> [options]')
  .demandCommand(1)
  .options({
    order: {
      description: 'The type of ordering to use, default "random" [choices: "random", "worst-first", "recent-mistakes-first"]',
      requiresArg: true
    },
    repetitions: {
      description: 'The number of times to each card should be answered successfully. If not provided, every card is presented once, regardless of the correctness of the answer.',
      requiresArg: true
    },
    invertCards: {
      description: 'If set, it flips answer and question for each card. That is, it prompts with the card\'s answer and asks the user to provide the corresponding question. Default: false'
    }
  })
  .default({ order: 'random', repetitions: 1 })

var argv = pkg.parseSync()

var organizer = newCardShuffler()
const repeats = argv.repetitions as number
const filepath = argv._[0] as string
const orderString = argv.order as string

try {
  if (orderString === 'worst-first') {
    organizer = newMostMistakesFirstSorter()
  } else if (orderString === 'recent-mistakes-first') {
    organizer = newRecentMistakesFirstSorter()
  } else if (orderString !== 'random' && orderString !== undefined) {
    throw new Error('Invalid order value: ' + orderString)
  }
  if (repeats < 1) {
    throw new Error('Repetition value cannot be less than 1: ' + repeats.toString())
  } else if (repeats !== undefined) {
    organizer = newCombinedCardOrganizer([organizer, newRepeatingCardOrganizer(repeats)])
  }

  var cards = loadCards(filepath)

  if (argv.invertCards as boolean) {
    cards = cards.invertCards()
  }
  const cardDeck = newCardDeck(
    cards.getAllCards(),
    organizer
  )
  newUI().studyCards(cardDeck)
} catch (e) {
  console.log(e)
}
