import { describe, expect, it } from  'vitest'

import { getFutureDate } from '../../tests/utils/get-future-date'
import { Appointment } from '../entities/appointment'
import { AppointmentsService } from '../services/appointments.service'

import { CreateAppointment } from './create-appointment'

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {

    // given
    const startsAt = getFutureDate('2023-03-21')
    const endsAt = getFutureDate('2023-03-23')
    
    const appointmentsService = new AppointmentsService()
    const appointmentProps = {
      customer: 'John Doe',
      startsAt,
      endsAt,
    }

    // when
    const createAppointment = new CreateAppointment(appointmentsService)

    // then
    expect(createAppointment.execute(appointmentProps)).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create an appointment with overlapping dates', async () => {
    // given
    const startsAt = getFutureDate('2023-03-21')
    const endsAt = getFutureDate('2023-03-27')
    const conflictedStartsAt = getFutureDate('2023-03-22')
    const conflictedEndsAt = getFutureDate('2023-03-25')
    
    const appointmentsService = new AppointmentsService()
    const appointmentProps = {
      customer: 'John Doe',
      startsAt,
      endsAt,
    }

    const conflictedAppointmentProps = {
      customer: 'John Doe',
      startsAt: conflictedStartsAt,
      endsAt: conflictedEndsAt,
    }

    // when
    const createAppointment = new CreateAppointment(
      appointmentsService,
    )

    await createAppointment.execute(appointmentProps)

    // then
    expect(createAppointment.execute(conflictedAppointmentProps)).rejects.toBeInstanceOf(Error)
  })
})