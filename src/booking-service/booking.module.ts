/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/enitities/booking/booking.entitiy';
import { User } from 'src/enitities/users/users.enitity';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User])],
  controllers: [],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
