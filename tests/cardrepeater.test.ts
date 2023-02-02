import { CardStatus, newCardStatus } from '../src/cards/cardstatus'
import { loadCards } from '../src/data/store'
import { newNonRepeatingCardOrganizer, newRepeatingCardOrganizer } from '../src/ordering/repetition/cardrepeater'

const cards = loadCards('cards/designpatterns.csv').getAllCards()
var original: CardStatus[] = []
for (const card of cards) {
  original.push(newCardStatus(card))
}
const nonrepeater = newNonRepeatingCardOrganizer()
const repeater = newRepeatingCardOrganizer(2)

function reset (crds: CardStatus[]): CardStatus[] {
  for (const card of crds) {
    card.clearResults()
  }
  return crds
}

test('test newRepeatingCardOrganizer: negative repetitions input', () => {
  var correct = false
  try {
    newRepeatingCardOrganizer(-1)
  } catch (e) {
    correct = true
  }
  if (!correct) expect(false).toBeTruthy()
})

test('test newRepeatingCardOrganizer: 0 repetitions input', () => {
  var correct = false
  try {
    newRepeatingCardOrganizer(0)
  } catch (e) {
    correct = true
  }
  if (!correct) expect(false).toBeTruthy()
})

test('test nonrepeater reorganize: all incorrect', () => {
  original = reset(original)
  for (const card of original) {
    card.recordResult(false)
  }
  const reorganized = nonrepeater.reorganize(original)
  expect(reorganized.length === 0).toBeTruthy()
})

test('test nonrepeater reorganize: some answered', () => {
  original = reset(original)
  for (var i = 0; i < 3; i++) {
    original[i].recordResult(true)
  }
  const reorganized = nonrepeater.reorganize(original)
  expect(reorganized.length === 4).toBeTruthy()
})

test('test nonrepeater reorganize: no answers', () => {
  original = reset(original)
  const reorganized = nonrepeater.reorganize(original)
  expect(reorganized.length === 7).toBeTruthy()
})

test('test repeater reorganize: all incorrect', () => {
  original = reset(original)
  for (const card of original) {
    card.recordResult(false)
  }
  const reorganized = repeater.reorganize(original)
  expect(reorganized.length === 7).toBeTruthy()
})

test('test repeater reorganize: need 2 correct passes', () => {
  original = reset(original)
  for (const card of original) {
    card.recordResult(true)
  }
  const reorganized = repeater.reorganize(original)
  expect(reorganized.length === 7).toBeTruthy()
})
