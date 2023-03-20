import { setYear, parseISO } from 'date-fns';

/**
 * Get future date
 * @param date string
 */
export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}