/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/enitities/users/users.enitity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    role: 'client' | 'professional',
  ) {
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) throw new BadRequestException('Email already in use');

    const newUser = this.userRepo.create({ name, email, password, role });
    await this.userRepo.save(newUser);

    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new BadRequestException('Invalid credentials');

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    return { accessToken: token };
  }
}
