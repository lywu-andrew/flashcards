import { newFlashCard } from '../src/cards/flashcard'

const fc = newFlashCard('Question', 'Answer')

test('test new flashcard: creates a new flashcard', () => {
  expect(fc.getQuestion() === 'Question').toBeTruthy()
  expect(fc.getAnswer() === 'Answer').toBeTruthy()
})

test('test trailing whitespace: correct answer has whitespace', () => {
  expect(fc.checkSuccess('Answer ')).toBeTruthy()
})

test('test leading whitespace: correct answer has whitespace', () => {
  expect(fc.checkSuccess(' Answer')).toBeTruthy()
})

test('test capitalization mismatch: correct answer has weird capitalization', () => {
  expect(fc.checkSuccess('aNsWER')).toBeTruthy()
})
