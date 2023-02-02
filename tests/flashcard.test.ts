import { newFlashCard } from '../src/cards/flashcard'

const fc = newFlashCard('Question', 'Answer')
// test equals?

test('test trailing whitespace: correct answer has whitespace', () => {
  expect(fc.checkSuccess('Answer ')).toBeTruthy()
})

test('test leading whitespace: correct answer has whitespace', () => {
  expect(fc.checkSuccess(' Answer')).toBeTruthy()
})

test('test capitalization mismatch: correct answer has weird capitalization', () => {
  expect(fc.checkSuccess('aNsWER')).toBeTruthy()
})
