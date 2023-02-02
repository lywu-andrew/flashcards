import { CardStatus, newCardStatus } from '../src/cards/cardstatus'
import { loadCards } from '../src/data/store'
import { newCombinedCardOrganizer } from '../src/ordering/cardorganizer'
import { newNonRepeatingCardOrganizer, newRepeatingCardOrganizer } from '../src/ordering/repetition/cardrepeater'
import { newMostMistakesFirstSorter } from '../src/ordering/prioritization/mostmistakes'
import { newRecentMistakesFirstSorter } from '../src/ordering/prioritization/recentmistakes'

const cards = loadCards('cards/designpatterns.csv').getAllCards()
var original: CardStatus[] = []
for (const card of cards) {
  original.push(newCardStatus(card))
}
function reset (crds: CardStatus[]): CardStatus[] {
  for (const card of crds) {
    card.clearResults()
  }
  return crds
}

test('test combinedcardorganizer: empty', () => {
  original = reset(original)
  const organizer = newCombinedCardOrganizer([])
  const reorganized = organizer.reorganize(original)
  for (var i = 0; i < cards.length; i++) {
    expect(original[i].getCard().equals(reorganized[i].getCard())).toBeTruthy()
  }
})

test('test combinedcardorganizer: 1 card organizer', () => {
  original = reset(original)
  const organizer = newCombinedCardOrganizer([newMostMistakesFirstSorter()])
  for (const card of original) {
    if (!card.getCard().equals(original[cards.length - 2].getCard())) card.recordResult(true)
    else card.recordResult(false)
    card.recordResult(false)
  }
  const reorganized = organizer.reorganize(original)
  expect(original[cards.length - 2].getCard().equals(reorganized[0].getCard())).toBeTruthy()
  expect(original[cards.length - 1].getCard().equals(reorganized[cards.length - 1].getCard())).toBeTruthy()
  for (var i = 0; i < cards.length - 2; i++) {
    expect(original[i].getCard().equals(reorganized[i + 1].getCard())).toBeTruthy()
  }
})

test('test combinedcardorganizer: recentmistakes and nonrepeating', () => {
  original = reset(original)
  const organizer = newCombinedCardOrganizer([newRecentMistakesFirstSorter(), newNonRepeatingCardOrganizer()])
  for (const card of original) {
    if (!card.getCard().equals(original[1].getCard())) {
      card.recordResult(false)
    } else {
      card.recordResult(true)
    }
  }
  const reorganized = organizer.reorganize(original)
  expect(reorganized.length === 0).toBeTruthy()
})

test('test combinedcardorganizer: mostmistakes and nonrepeating', () => {
  original = reset(original)
  const organizer = newCombinedCardOrganizer([newMostMistakesFirstSorter(), newNonRepeatingCardOrganizer()])
  for (const card of original) {
    if (!card.getCard().equals(original[3].getCard())) {
      card.recordResult(false)
    } else {
      card.recordResult(true)
    }
  }
  const reorganized = organizer.reorganize(original)
  expect(reorganized.length === 0).toBeTruthy()
})

test('test combinedcardorganizer: recentmistakes and repeating', () => {
  original = reset(original)
  const organizer = newCombinedCardOrganizer([newRecentMistakesFirstSorter(), newRepeatingCardOrganizer(2)])
  for (const card of original) {
    if (!card.getCard().equals(original[1].getCard())) {
      card.recordResult(false)
      card.recordResult(true)
    } else {
      card.recordResult(true)
      card.recordResult(false)
    }
  }
  var reorganized = organizer.reorganize(original)
  expect(reorganized.length === 7).toBeTruthy()
  expect(original[1].getCard().equals(reorganized[0].getCard())).toBeTruthy()
  expect(original[0].getCard().equals(reorganized[1].getCard())).toBeTruthy()
  for (var i = 2; i < cards.length; i++) {
    expect(original[i].getCard().equals(reorganized[i].getCard())).toBeTruthy()
  }
  for (const card of reorganized) {
    card.recordResult(true)
  }
  reorganized = organizer.reorganize(reorganized)
  expect(reorganized.length === 0).toBeTruthy()
})

test('test combinedcardorganizer: recentmistakes and repeating test (checking successes)', () => {
  original = reset(original)
  const organizer = newCombinedCardOrganizer([newRecentMistakesFirstSorter(), newRepeatingCardOrganizer(2)])
  for (const card of original) {
    if (!card.getCard().equals(original[1].getCard())) {
      card.recordResult(false)
      card.recordResult(true)
    } else {
      card.recordResult(true)
      card.recordResult(false)
    }
  }
  const reorganized1 = organizer.reorganize(original)
  expect(reorganized1.length === 7).toBeTruthy()
  expect(original[1].getCard().equals(reorganized1[0].getCard())).toBeTruthy()
  expect(original[0].getCard().equals(reorganized1[1].getCard())).toBeTruthy()
  for (var i = 2; i < cards.length; i++) {
    expect(original[i].getCard().equals(reorganized1[i].getCard())).toBeTruthy()
  }
  for (const card of reorganized1) {
    if (card.getCard().equals(reorganized1[3].getCard())) card.recordResult(false)
    else if (card.getCard().equals(reorganized1[4].getCard())) card.recordResult(false)
    else card.recordResult(true)
  }
  const reorganized2 = organizer.reorganize(reorganized1)
  expect(reorganized2.length === 2).toBeTruthy()
  expect(reorganized1[3].getCard().equals(reorganized2[0].getCard())).toBeTruthy()
  expect(reorganized1[4].getCard().equals(reorganized2[1].getCard())).toBeTruthy()
  reorganized2[0].recordResult(true)
  reorganized2[1].recordResult(true)
  const reorganized3 = organizer.reorganize(reorganized2)
  expect(reorganized3.length === 0).toBeTruthy()
})
