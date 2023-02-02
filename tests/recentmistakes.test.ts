import { CardStatus, newCardStatus } from '../src/cards/cardstatus'
import { loadCards } from '../src/data/store'
import { newRecentMistakesFirstSorter } from '../src/ordering/prioritization/recentmistakes'

const cards = loadCards('cards/designpatterns.csv').getAllCards()
var original: CardStatus[] = []
for (const card of cards) {
  original.push(newCardStatus(card))
}
const sorter = newRecentMistakesFirstSorter()

test('test reorganize: all cards correct', () => {
  for (const card of original) {
    card.recordResult(true)
  }
  const reorganized = sorter.reorganize(original)
  for (var i = 0; i < original.length; i++) {
    expect(reorganized[i].getCard().equals(original[i].getCard()))
  }
})

test('test reorganize: same number of incorrect', () => {
  for (const card of original) {
    card.recordResult(false)
  }
  original[cards.length - 1].clearResults()
  original[cards.length - 1].recordResult(true)
  for (const card of original) {
    if (!card.getCard().equals(original[cards.length - 1].getCard())) card.recordResult(true)
  }
  original[cards.length - 1].recordResult(false)
  const reorganized = sorter.reorganize(original)
  for (var i = 1; i < original.length; i++) {
    expect(reorganized[i].getCard().equals(original[i - 1].getCard())).toBeTruthy()
  }
  expect(reorganized[0].getCard().equals(original[cards.length - 1].getCard())).toBeTruthy()
})

test('test reorganize: stable sort incorrect cards', () => {
  for (const card of original) {
    card.recordResult(true)
  }
  original[2].clearResults()
  original[2].recordResult(false)
  original[3].clearResults()
  original[3].recordResult(false)
  original[cards.length - 1].clearResults()
  original[cards.length - 1].recordResult(false)
  const reorganized = sorter.reorganize(original)
  expect(reorganized[0].getCard().equals(original[2].getCard())).toBeTruthy()
  expect(reorganized[1].getCard().equals(original[3].getCard())).toBeTruthy()
  expect(reorganized[2].getCard().equals(original[cards.length - 1].getCard())).toBeTruthy()
})

test('test reorganize: stable sort correct cards', () => {
  for (const card of original) {
    card.recordResult(true)
  }
  original[2].clearResults()
  original[2].recordResult(false)
  original[3].clearResults()
  original[3].recordResult(false)
  original[cards.length - 1].clearResults()
  original[cards.length - 1].recordResult(false)
  const reorganized = sorter.reorganize(original)
  expect(reorganized[3].getCard().equals(original[0].getCard())).toBeTruthy()
  expect(reorganized[4].getCard().equals(original[1].getCard())).toBeTruthy()
  expect(reorganized[5].getCard().equals(original[4].getCard())).toBeTruthy()
  expect(reorganized[6].getCard().equals(original[5].getCard())).toBeTruthy()
})

test('test reorganize: some cards more incorect', () => {
  for (const card of original) {
    card.recordResult(false)
  }
  for (const card of original) {
    card.recordResult(false)
  }
  original[2].clearResults()
  original[2].recordResult(true)
  original[cards.length - 1].clearResults()
  original[cards.length - 1].recordResult(true)
  for (const card of original) {
    if (card.getCard().equals(original[2].getCard())) card.recordResult(false)
    else if (card.getCard().equals(original[cards.length - 1].getCard())) card.recordResult(false)
    else card.recordResult(true)
  }
  const reorganized = sorter.reorganize(original)

  expect(reorganized[0].getCard().equals(original[2].getCard())).toBeTruthy()
  expect(reorganized[1].getCard().equals(original[cards.length - 1].getCard())).toBeTruthy()
  expect(reorganized[2].getCard().equals(original[0].getCard())).toBeTruthy()
  expect(reorganized[3].getCard().equals(original[1].getCard())).toBeTruthy()

  for (var i = 3; i < original.length - 1; i++) {
    expect(reorganized[i + 1].getCard().equals(original[i].getCard())).toBeTruthy()
  }
})
