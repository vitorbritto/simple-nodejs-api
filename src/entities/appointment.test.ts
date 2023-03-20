import { expect, test } from 'vitest'

import { getFutureDate } from '../../tests/utils/get-future-date'

import { Appointment } from './appointment'

test('create an appointment', () => {
  // given
  const startsAt = getFutureDate('2023-03-21')
  const endsAt = getFutureDate('2023-03-23')

  const appointmentProps = {
    customer: 'John Doe',
    startsAt,
    endsAt,
  }

  endsAt.setDate(endsAt.getDate() + 1)
  
  // when
  const appointment = new Appointment(appointmentProps)

  // then
  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
})

test('should not create an appointment when endsAt date is earlier than startsAt date', () => {
    // given
    const startsAt = getFutureDate('2023-03-21')
    const endsAt = getFutureDate('2023-03-20')
    const appointmentProps = {
      customer: 'John Doe',
      startsAt,
      endsAt,
    }
    
    // when

    // then
    expect(() => {
      return new Appointment(appointmentProps)
    }).toThrowError("Invalid end date")
})

test('should not create an appointment when startsAt date is earlier than now', () => {
  // given
  const startsAt = new Date();
  const endsAt = new Date();
  const appointmentProps = {
    customer: 'John Doe',
    startsAt,
    endsAt,
  }
  
  // when
  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  // then
  expect(() => {
    return new Appointment(appointmentProps)
  }).toThrowError("Invalid start date")
})