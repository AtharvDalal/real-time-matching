/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/enitities/booking/booking.entitiy';
import { User } from 'src/enitities/users/users.enitity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBooking(
    professionalId: number,
    clientId: number,
    service: string,
    status: 'pending' | 'confirmed' | 'completed' | 'canceled',
  ) {
    const professional = await this.userRepository.findOne({
      where: { id: professionalId },
    });
    const client = await this.userRepository.findOne({
      where: { id: clientId },
    });

    if (!professional || !client) {
      throw new Error('Professional or Client not found');
    }

    const booking = this.bookingRepository.create({
      professional,
      client,
      service,
      status,
    });
    return await this.bookingRepository.save(booking);
  }

  async getBookingById(id: string) {
    return await this.bookingRepository.findOne({
      where: { id },
      relations: ['client', 'professional'],
    });
  }

  async updateBookingStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'completed' | 'canceled',
  ) {
    await this.bookingRepository.update(id, { status });
    return await this.getBookingById(id);
  }
}
