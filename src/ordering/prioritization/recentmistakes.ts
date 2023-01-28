import { CardStatus } from '../../cards/cardstatus'
import { CardOrganizer } from '../cardorganizer'

function newRecentMistakesFirstSorter (): CardOrganizer {
  return {
    /**
        * Orders the cards so that those that were answered incorrectly on the last answer appear first. This is a a stable ordering.
        *
        * @param cards The {@link CardStatus} objects to order.
        * @return The final ordered list of cards.
        */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const status = cards.slice()
      const prevFailures: CardStatus[] = []
      let i = 0
      let size = cards.length
      while (i < size) {
        const card = status[i]
        const results = card.getResults()
        if (results.length === 0) {
          continue
        } else {
          const lastResult = results[results.length - 1]
          if (!lastResult) {
            status.splice(i, 1)
            prevFailures.push(card)
            size -= 1
          } else {
            i += 1
          }
        }
      }
      return prevFailures.concat(status)
    }
  }
}

export { newRecentMistakesFirstSorter }
