/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { MatchingService } from './matching.service';

@Controller('match')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get('add-professional')
  async addProfessional(
    @Query('id') id: string,
    @Query('service') service: string,
    @Query('location') location: string,
  ) {
    await this.matchingService.addProfessionalToPool(id, service, location);
    return { message: 'Professional added to pool' };
  }

  @Get('find-professional')
  async findProfessional(
    @Query('service') service: string,
    @Query('location') location: string,
  ) {
    const professional = await this.matchingService.findAvailableProfessional(
      service,
      location,
    );
    return professional
      ? professional
      : { message: 'No available professional found' };
  }
}
