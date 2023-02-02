import { loadCards } from '../src/data/store'
import { newRecentMistakesFirstSorter } from '../src/ordering/prioritization/recentmistakes'
import { newMostMistakesFirstSorter } from '../src/ordering/prioritization/mostmistakes'
import { newCardDeck } from '../src/ordering/cardproducer'

test('test reorganize in cardproducer: recentmistakes organizer', () => {
  const cardDeck = newCardDeck(
    loadCards('cards/designpatterns.csv').getAllCards(),
    newRecentMistakesFirstSorter()
  )
  var cards = cardDeck.getCards()
  for (const card of cards) {
    card.recordResult(false)
  }
  cards[cards.length - 1].clearResults()
  cards[cards.length - 1].recordResult(true)
  for (const card of cards) {
    if (!card.getCard().equals(cards[cards.length - 1].getCard())) card.recordResult(true)
  }
  cards[cards.length - 1].recordResult(false)
  cardDeck.reorganize()
  const reorganized = cardDeck.getCards()
  for (var i = 1; i < cards.length; i++) {
    expect(reorganized[i].getCard().equals(cards[i - 1].getCard())).toBeTruthy()
  }
  expect(reorganized[0].getCard().equals(cards[cards.length - 1].getCard())).toBeTruthy()
})

test('test reorganize in cardproducer: mostmistakes organizer', () => {
  const cardDeck = newCardDeck(
    loadCards('cards/designpatterns.csv').getAllCards(),
    newMostMistakesFirstSorter()
  )
  var cards = cardDeck.getCards()
  for (const card of cards) {
    card.recordResult(true)
    card.recordResult(true)
  }
  cards[cards.length - 1].clearResults()
  cards[cards.length - 1].recordResult(false)
  cards[cards.length - 1].recordResult(false)
  for (const card of cards) {
    if (!card.getCard().equals(cards[cards.length - 1].getCard())) card.recordResult(false)
  }
  cards[cards.length - 1].recordResult(true)
  cardDeck.reorganize()
  const reorganized = cardDeck.getCards()
  for (var i = 1; i < cards.length; i++) {
    expect(reorganized[i].getCard().equals(cards[i - 1].getCard())).toBeTruthy()
  }
  expect(reorganized[0].getCard().equals(cards[cards.length - 1].getCard())).toBeTruthy()
})

test('test countcards: correct initial card number', () => {
  const cardDeck = newCardDeck(
    loadCards('cards/designpatterns.csv').getAllCards(),
    newMostMistakesFirstSorter()
  )
  expect(cardDeck.countCards() === 7).toBeTruthy()
})

test('test countcards: no cards', () => {
  const cardDeck = newCardDeck(
    [],
    newMostMistakesFirstSorter()
  )
  expect(cardDeck.countCards() === 0).toBeTruthy()
})

// isComplete tests needed... after doing cardrepeater
