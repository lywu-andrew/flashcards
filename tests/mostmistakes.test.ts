import { CardStatus, newCardStatus } from '../src/cards/cardstatus'
import { loadCards } from '../src/data/store'
import { newMostMistakesFirstSorter } from '../src/ordering/prioritization/mostmistakes'

const cards = loadCards('cards/designpatterns.csv').getAllCards()
var original: CardStatus[] = []
for (const card of cards) {
  original.push(newCardStatus(card))
}
const sorter = newMostMistakesFirstSorter()

function reset (crds: CardStatus[]): CardStatus[] {
  for (const card of crds) {
    card.clearResults()
  }
  return crds
}

test('test reorganize: no cards', () => {
  const empty: CardStatus[] = []
  const reorganized = sorter.reorganize(empty)
  expect(reorganized.length === 0).toBeTruthy()
})

test('test reorganize: last card reorganized to first', () => {
  original = reset(original)
  for (const card of original) {
    card.recordResult(true)
  }
  original[cards.length - 1].clearResults()
  original[cards.length - 1].recordResult(false)
  const reorganized = sorter.reorganize(original)
  for (var i = 1; i < original.length; i++) {
    expect(reorganized[i].getCard().equals(original[i - 1].getCard())).toBeTruthy()
  }
  expect(reorganized[0].getCard().equals(original[cards.length - 1].getCard())).toBeTruthy()
})

test('test reorganize: most mistakes reorganized to first', () => {
  original = reset(original)
  original[cards.length - 1].recordResult(false)
  original[cards.length - 1].recordResult(false)
  original[cards.length - 1].recordResult(false)
  original[1].recordResult(false)
  original[1].recordResult(false)
  original[cards.length - 2].recordResult(false)
  const reorganized = sorter.reorganize(original)
  expect(reorganized[0].getCard().equals(original[cards.length - 1].getCard())).toBeTruthy()
  expect(reorganized[1].getCard().equals(original[1].getCard())).toBeTruthy()
  expect(reorganized[2].getCard().equals(original[cards.length - 2].getCard())).toBeTruthy()
})

test('test reorganize: only first card correct', () => {
  original = reset(original)
  for (const card of original) {
    card.recordResult(false)
  }
  original[0].clearResults()
  original[0].recordResult(true)
  const reorganized = sorter.reorganize(original)
  expect(reorganized[cards.length - 1].getCard().equals(original[0].getCard())).toBeTruthy()
})