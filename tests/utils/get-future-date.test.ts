import { test, expect } from  'vitest'
import { getFutureDate } from './get-future-date'

test('increases date with one year', () => {
  const currentYear = new Date().getFullYear();
  expect(getFutureDate(`${currentYear}-03-21`).getFullYear()).toEqual(2024)
})