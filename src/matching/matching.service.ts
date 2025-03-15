/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class MatchingService {
  private redisClient = new Redis({ host: 'localhost', port: 6379 });

  async addProfessionalToPool(
    professionalId: string,
    serviceType: string,
    location: string,
  ) {
    const key = `professionals:${serviceType}`;
    await this.redisClient.hset(
      key,
      professionalId,
      JSON.stringify({ professionalId, location }),
    );
  }

  async findAvailableProfessional(serviceType: string, location: string) {
    const key = `professionals:${serviceType}`;
    const professionals = await this.redisClient.hgetall(key);

    for (const [id, data] of Object.entries(professionals)) {
      const professional = JSON.parse(data);
      if (professional.location === location) {
        await this.redisClient.hdel(key, id); // Remove from pool after assignment
        return professional;
      }
    }
    return null;
  }

  async findProfessionalByLocation(serviceType: string, location: string) {
    const key = `professionals:${serviceType}`;
    const professionals = await this.redisClient.hgetall(key);

    return null;
  }
}
