import { FlashCard, newFlashCard } from '../src/cards/flashcard'
import { newInMemoryCardStore } from '../src/data/store'

const fc1 = newFlashCard('Question1', 'Answer')
const dup = newFlashCard('Question1', 'Answer')
const fc2 = newFlashCard('Question2', 'Answer')
const cards = newInMemoryCardStore([])

function arrayEquals (a: FlashCard[], b: FlashCard[]): boolean {
  if (a === null || b === null) return false
  else if (a.length !== b.length) return false
  else {
    for (var i = 0; i < a.length; i++) {
      if (!a[i].equals(b[i])) return false
    }
    return true
  }
}

test('test addCard: add new card', () => {
  expect(cards.addCard(fc1)).toBeTruthy()
  expect(arrayEquals(cards.getAllCards(), [fc1])).toBeTruthy()
})

test('test addCard: add duplicate card', () => {
  expect(cards.addCard(dup)).toBeFalsy()
  expect(arrayEquals(cards.getAllCards(), [fc1])).toBeTruthy()
})

test('test removeCard: remove nonexisting card', () => {
  expect(cards.removeCard(fc2)).toBeFalsy()
  expect(arrayEquals(cards.getAllCards(), [fc1])).toBeTruthy()
})

test('test removeCard: remove existing card', () => {
  expect(cards.removeCard(fc1)).toBeTruthy()
  expect(arrayEquals(cards.getAllCards(), [])).toBeTruthy()
})

test('test addCard: add previously removed card', () => {
  expect(cards.addCard(fc1)).toBeTruthy()
})

const inverted = newFlashCard('Answer', 'Question1')
const invertedCards = newInMemoryCardStore([inverted])

test('test invertCards: correctly inverted cards', () => {
  expect(arrayEquals(cards.invertCards().getAllCards(), invertedCards.getAllCards())).toBeTruthy()
})
