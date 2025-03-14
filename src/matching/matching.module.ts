/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';

@Module({
  controllers: [MatchingController],
  providers: [MatchingService], // ✅ Register service here
  exports: [MatchingService], // ✅ Export service for other modules if needed
})
export class MatchingModule {}
