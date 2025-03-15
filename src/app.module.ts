/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enitities/users/users.enitity';
import { ServiceRequest } from './enitities/services/service-request-enitiy';
import { AuthModule } from './auth/auth.module';
import { MatchingController } from './matching/matching.controller';
import { MatchingModule } from './matching/matching.module';
import { BookingModule } from './booking-service/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // NeonDB connection string
      ssl: { rejectUnauthorized: false }, // Required for NeonDB
      entities: [User, ServiceRequest],
      synchronize: true,
    }),
    MatchingModule,
    AuthModule,
    BookingModule,
  ],
  controllers: [AppController, MatchingController],
  providers: [AppService],
})
export class AppModule {}
