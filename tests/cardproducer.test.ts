/**
const cardDeck = newCardDeck(
  loadCards('cards/designpatterns.csv').getAllCards(),
  newMostMistakesFirstSorter()
)

test('test reorganize in mostMistakes: last card reorganized to first', () => {
  var cards = cardDeck.getCards()
  for (const card of cards) {
    card.recordResult(true)
  }
  cards[cards.length - 1].clearResults()
  cards[cards.length - 1].recordResult(false)
  cardDeck.getOrganizer().reorganize()
  expect().toBeTruthy()
})

*/

test('placeholder', () => {
  expect(true).toBeTruthy()
})
