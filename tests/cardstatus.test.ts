import { newFlashCard } from '../src/cards/flashcard'
import { newCardStatus } from '../src/cards/cardstatus'

const fc = newFlashCard('Question', 'Answer')
const cs = newCardStatus(fc)

function arrayEquals (a: boolean[], b: boolean[]): boolean {
  if (a === null || b === null) return false
  else if (a.length !== b.length) return false
  else {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }
}

test('test getResults: initially empty results', () => {
  expect(arrayEquals(cs.getResults(), [])).toBeTruthy()
})

test('test recordResults: 1 success', () => {
  cs.recordResult(true)
  expect(arrayEquals(cs.getResults(), [true])).toBeTruthy()
})

test('test recordResults: 1 failure', () => {
  cs.recordResult(false)
  expect(arrayEquals(cs.getResults(), [true, false])).toBeTruthy()
})

test('test clearResults: clear results', () => {
  cs.clearResults()
  expect(arrayEquals(cs.getResults(), [])).toBeTruthy()
})
