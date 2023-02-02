import { newFlashCard } from '../src/cards/flashcard'

const fc = newFlashCard('Question', 'Answer')

test('test trailing whitespace: correct answer has whitespace', () => {
  expect(fc.checkSuccess('Answer ')).toBeTruthy()
})

test('test leading whitespace: correct answer has whitespace', () => {
  expect(fc.checkSuccess(' Answer')).toBeTruthy()
})

test('test capitalization mismatch: correct answer has weird capitalization', () => {
  expect(fc.checkSuccess('aNsWER')).toBeTruthy()
})

const dup = newFlashCard('Question', 'Answer')
const wrong = newFlashCard('question', 'answer')

test('test equals: needs to be same string', () => {
  expect(fc.equals(dup)).toBeTruthy()
  expect(fc.equals(wrong)).toBeFalsy()
})
