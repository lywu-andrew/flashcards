import { CardStatus } from '../cards/cardstatus'

interface CardOrganizer {

  /**
     * Orders, and potentially filters, the provided cards.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The provided cards, sorted and/or filtered based on the implementing class.
     */
  reorganize: (cards: CardStatus[]) => CardStatus[]

}

/**
 * A <b>composite</b> class that wraps other {@link CardOrganizer} instances and a list of {@link CardStatus} cards.
 */
function newCombinedCardOrganizer (cardOrganizers: CardOrganizer[]): CardOrganizer {
  return {

    /**
         * Applies each {@link CardOrganizer} instance to the provided collection of cards. This method makes no guarantees
         * about the order in which the underlying sorters are invoked; the final order may be dependent on this order when
         * conflicting priorities are involved.
         *
         * @param cards The {@link CardStatus} objects to order.
         * @return The final, filtered and ordered list of cards.
         */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      let status = cards.slice()
      for (const cardOrganizer of cardOrganizers) {
        status = cardOrganizer.reorganize(status)
      }
      return status
    }
  }
}

function newRecentMistakesFirstSorter (): CardOrganizer {
  return {
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

export { CardOrganizer, newCombinedCardOrganizer, newRecentMistakesFirstSorter }
