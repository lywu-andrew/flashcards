import { newFlashCard } from '../src/cards/flashcard'
import { newCardStatus } from '../src/cards/cardstatus'

const fc = newFlashCard('Question', 'Answer')

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
  const cs = newCardStatus(fc)
  expect(arrayEquals(cs.getResults(), [])).toBeTruthy()
})

test('test recordResults: 1 success', () => {
  const cs = newCardStatus(fc)
  cs.recordResult(true)
  expect(arrayEquals(cs.getResults(), [true])).toBeTruthy()
})

test('test recordResults: 1 failure', () => {
  const cs = newCardStatus(fc)
  cs.recordResult(true)
  cs.recordResult(false)
  expect(arrayEquals(cs.getResults(), [true, false])).toBeTruthy()
})

test('test clearResults: clear results', () => {
  const cs = newCardStatus(fc)
  cs.clearResults()
  expect(arrayEquals(cs.getResults(), [])).toBeTruthy()
})
